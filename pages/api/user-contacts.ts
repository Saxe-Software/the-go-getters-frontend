import { sendEmail } from '../../helpers/email';

export default async function handler(req: any, res: any) {
    try {
        if (req.method !== 'POST') {
            res.status(405).send('Invalid request method.');
            return;
        }

        if (!req.body.name || !req.body.email || !req.body.message) {
            res.status(400).send('Name, email, and message are all required.');
            return;
        }

        await sendEmail({
            replyTo: req.body.email,
            subject: 'New User Contact',
            text: `
              Bing bong, you got a user contact.

              Name: ${req.body.name}
              Email: ${req.body.email}
              Message: ${req.body.message}
            `,
        });

        res.status(200).send();
        return;
    } catch (err: any) {
        res.status(500).send(err.message);
    }
}
