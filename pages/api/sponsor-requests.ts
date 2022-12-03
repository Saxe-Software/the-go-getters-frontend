import axios from 'axios';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).send();
  }

  if (!req.body.name || !req.body.email || !req.body.business || !req.body.message) res.status(400).send('Name, email, business, and message are all required.');

  console.log(req.body);

  try {
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

    res.status(200).json(response.data.data).send();
  } catch (err: any) {
    console.log(err?.response?.data?.error);
    res.status(500).json(err?.response?.data?.error?.message).send();
  }
}
