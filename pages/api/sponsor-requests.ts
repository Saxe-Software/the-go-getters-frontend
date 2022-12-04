import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405);
      throw new Error('Invalid request method.');
    }

    if (!req.body.name || !req.body.email || !req.body.business || !req.body.message) {
      res.status(400);
      throw new Error('Name, email, business, and message are all required.');
    }

    const response = await axios.post(
      `${process.env.API_ROOT}/sponsor-requests`,
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
  } catch (err: any) {
    if (!res.status) res.status(500);

    res.json(err);
  }

  res.send();
}
