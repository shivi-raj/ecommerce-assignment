import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { ObjectType } from "../types/types";
import HttpStatus from 'http-status-codes'
import { prisma } from "../prisma/prismaClient";

export function authenticateToken(req: Request, res: ObjectType, next: NextFunction) {
    // Get the JWT token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const secret: any = process.env.JWT_SECRET

    // If token is not provided, return 401 Unauthorized
    if (!token) {
        res.error(new Error('Authentication token is missing'),HttpStatus.UNAUTHORIZED);
        return;
    }

    // Verify the token
    jwt.verify(token, secret, async (err: any, user: any) => {
        if (err) {
        res.error(new Error('Invalid token'),HttpStatus.FORBIDDEN);
        return;
        }
        console.log('user...', user);
        // { sub: 1, iat: 1711819024, exp: 1711822624 }
        
    // Find user by id
    const userExist = await prisma.user.findUnique({
        where: {
            id: user.sub
        }
    });

    // If user not found
    if (!userExist) {
        res.error(new Error('Invalid token'),HttpStatus.FORBIDDEN);
        return;
    }

        // Attach the user object to the request for further use in route handlers
        req.user = user;
        next(); // Call the next middleware or route handler
    });
}