import jwt from 'jsonwebtoken';
import { Request } from "express";
import { prisma } from '../../../prisma/prismaClient';
import { comparePasswords, generate8DigitCode, hashPassword, sendMail } from '../../../utils/utils';
import { logger } from '../../../libs/logger';

export class UserService {

    // User Registration
    async register(req: Request) {
        try {
            const {
                name,
                email,
                password
            } = req.body

            const payload: any = { name, email, password: await hashPassword(password) };
            const result = await prisma.user.create({ data: payload });
            await this.sendVerificationCode(result.id);
            logger.info("User Registration Successfull");
            return Promise.resolve(result)
        } catch (err: any) {
            return Promise.reject(err)
        }
    }


    // login function
    async login(req: Request) {
        try {
            const {
                email,
                password
            } = req.body

            // Find user by email
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            // If user not found
            if (!user) {
                throw new Error('User not found');
            }

            const isPasswordCorrect = await comparePasswords(password, user.password);

            if (!isPasswordCorrect) {
                throw new Error('Incorrect password');
            }

            const secret: any = process.env.JWT_SECRET
            const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '24h' });
            logger.info("User login successfull");
            return Promise.resolve({ token });
        } catch (err: any) {
            return Promise.reject(err);
        }
    }

    async sendVerificationCode(userId: any) {
        try {
            const code = generate8DigitCode();
            const updatedItem = await prisma.user.update({
                where: { id: userId },
                data: { code },
            });
            logger.info('Item updated:', updatedItem);
            const { email, name } = updatedItem;
            const subject = 'Verify Your Email Address';
            const body = `
                Dear ${name},<br/><br/>            
                To complete the verification process, please use the following verification code:<br/>
                Verification Code: <b>${code}</b><br/><br/>
                Thank you,<br/>
                Shivangi Raj
              `
            sendMail(email, subject, body);
        } catch (err: any) {
            logger.error("Error in sendVerificationCode", err)
        }
    }

    async verifyEmail(req: Request) {
        try {
            const { userId, code } = req.body
            const result = await prisma.user.findUnique({
                where: {
                    id: userId,
                    code,
                    isVerified: false
                }
            });

            // If result not found
            if (!result) {
                throw new Error('Code didnot match');
            }

            const updatedItem = await prisma.user.update({
                where: { id: userId },
                data: { isVerified: true },
            });
            return Promise.resolve(true);

        } catch (err: any) {
            logger.error("Error in verifyEmail", err);
            return Promise.reject(err);
        }
    }
}


