import bcrypt from 'bcrypt'
import { logger } from '../libs/logger';
import { mailer } from '../libs/mailer';

// Hashing function
export async function hashPassword(password: string) {
  try {
    const saltRounds = 10; // You can adjust the number of salt rounds according to your security requirements
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error('Error hashing password');
  }
}

// Comparing function
export async function comparePasswords(plainPassword: string, hashedPassword: string) {
  try {
    const match = await bcrypt.compare(plainPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
}

// Generate random 8 digit code
export function generate8DigitCode() {
  let code = '';
  for (let i = 0; i < 8; i++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
}

// Send Mail
export function sendMail(email: string, subject: string, body: string) {
  const mailOptions = {
    from: 'shivi2015k91@gmail.com',
    to: email,
    subject: subject,
    html: body
  };

  mailer.sendMail(mailOptions, function (error, info) {
    if (error) {
      logger.error('Error sending email: ', error);
    } else {
      logger.info('Email sent: ' + info.response);
    }
  });

}