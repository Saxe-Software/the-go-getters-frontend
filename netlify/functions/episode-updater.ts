import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { schedule } from '@netlify/functions';
import axios from 'axios';
import { saveSpotifyEpisodes, saveYoutubeEpisodes } from '../../helpers/data';
import fs from 'fs';

const { YOUTUBE_API_BASE_URL, YOUTUBE_API_KEY, YOUTUBE_PLAYLIST_ID, SPOTIFY_API_BASE_URL, SPOTIFY_API_AUTH_BASE_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_SHOW_ID, BUILD_HOOK_URL } = process.env;

const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
    if (!fs.existsSync('./netlify/functions/tmp')) {
        fs.mkdirSync('./netlify/functions/tmp');
    }

    const spotifyEpisodes = await getSpotifyEpisodes();
    const youtubeEpisodes = await getYoutubeEpisodes();

    const newSpotifyData = saveSpotifyEpisodes(spotifyEpisodes, './netlify/functions/tmp/spotify-episodes.json');
    const newYoutubeData = saveYoutubeEpisodes(youtubeEpisodes, './netlify/functions/tmp/youtube-videos.json');

    if (newSpotifyData || newYoutubeData) {
        console.log('New data found, triggering build');
        axios.post(BUILD_HOOK_URL as string);
    } else {
        console.log('Data is all up-to-date, skipping rebuild');
    }

    return { statusCode: 200 };
};

async function getSpotifyToken() {
    try {
        const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
        const form = new URLSearchParams();

        form.append('grant_type', 'client_credentials');

        const res = await axios.post(`${SPOTIFY_API_AUTH_BASE_URL}/token`, form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${basic}`,
            },
        });

        return res.data.access_token;
    } catch (err) {
        logAxiosError(err);
    }
}

async function getSpotifyEpisodes(offset: number = 0, pageSize: number = 50): Promise<Array<any>> {
    let episodes = [];

    try {
        const res = await axios.get(`${SPOTIFY_API_BASE_URL}/shows/${SPOTIFY_SHOW_ID}/episodes`, {
            headers: { Authorization: `Bearer ${await getSpotifyToken()}` },
            params: {
                limit: pageSize,
                market: 'ES',
                offset,
            },
        });

        episodes = [...res.data.items];

        if (!!res.data.next) episodes = episodes.concat(await getSpotifyEpisodes(offset + pageSize));
    } catch (err) {
        logAxiosError(err);
    }

    return episodes;
}

async function getYoutubeEpisodes(pageToken: string = '', pageSize: number = 50): Promise<Array<any>> {
    let episodes = [];

    try {
        const res = await axios.get(`${YOUTUBE_API_BASE_URL}/playlistItems`, {
            params: {
                key: YOUTUBE_API_KEY,
                playlistId: YOUTUBE_PLAYLIST_ID,
                part: 'snippet,id',
                maxResults: pageSize,
                type: 'video',
                pageToken,
            },
        });

        episodes = [...res.data.items];

        if (!!res.data.nextPageToken) episodes = episodes.concat(await getYoutubeEpisodes(res.data.nextPageToken));
    } catch (err) {
        logAxiosError(err);
    }

    return episodes;
}

function logAxiosError(axiosError: any) {
    if (axiosError.response) {
        console.error(axiosError.response.data);
        console.error(axiosError.response.status);
        console.error(axiosError.response.headers);
    } else if (axiosError.request) {
        console.error(axiosError.request);
    } else {
        console.error('Error', axiosError.message);
    }
    console.error(axiosError.config);
}

const handler = schedule('@daily', myHandler);

export { handler };
