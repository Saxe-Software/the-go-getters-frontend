import axios from 'axios';

export async function postApiData(path: string, body: any) {
    return await axios.post('/api' + path, body);
}
