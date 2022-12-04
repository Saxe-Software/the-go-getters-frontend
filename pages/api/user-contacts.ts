import axios from 'axios';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send();
    return;
  }

  if (!req.body.name || !req.body.email || !req.body.message) {
    res.status(400).send('Name, email, and message are all required.');
    return;
  }

  try {
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

    res.status(200).json(response.data.data).send();
  } catch (err: any) {
    res.status(500).json(err?.response?.data?.error?.message).send();
  }
}
