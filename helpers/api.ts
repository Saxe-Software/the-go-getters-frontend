import axios from 'axios';

export async function getApiData(path: string, populate: any = []) {
  const res = await axios.get(process.env.API_ROOT + path, {
    headers: {
      Authorization: `bearer ${process.env.API_KEY}`,
    },
    params: {
      populate: populate.toString(),
    },
  });

  return res.data.data;
}
