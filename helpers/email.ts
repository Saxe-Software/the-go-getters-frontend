import nodemailer from 'nodemailer';

export async function sendEmail(email: any) {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.EMAIL_SENDER_PASSWORD,
        },
    });

    const mailOptions = {
        from: `The Go Getters Bot`,
        to: process.env.EMAIL_RECEIVER,
        replyTo: email.replyTo || process.env.EMAIL_SENDER,
        subject: email.subject,
        text: email.text,
    };

    return new Promise<void>((resolve, reject) => {
        transporter.sendMail(mailOptions, (err: any) => {
            if (err) reject(err);
            else resolve();
        });
    });
}
