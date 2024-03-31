import nodemailer from 'nodemailer'
export const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shivi2015k91@gmail.com',
        pass: 'svjr wcjx owbo ksxu'
    }
});
