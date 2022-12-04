import axios from 'axios';

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

    const response = await axios.post(
      `${process.env.API_ROOT}/user-contacts`,
      {
        data: req.body,
      },
      {
        headers: {
          Authorization: `bearer ${process.env.API_KEY}`,
        },
      }
    );

    res.status(response.status).json(response.data.data);
    return;
  } catch (err: any) {
    res.status(500).send(err.message);
  }
}