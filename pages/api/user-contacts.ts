import axios from 'axios';

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== 'POST') {
      res.status(405);
      throw new Error('Invalid request method.');
    }

    if (!req.body.name || !req.body.email || !req.body.message) {
      res.status(400);
      throw new Error('Name, email, and message are all required.');
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

    if (response.status === 200) res.status(200).json(response.data.data);
  } catch (err: any) {
    if (!res.status) res.status(500);

    res.json(err);
  }

  res.send();
}
