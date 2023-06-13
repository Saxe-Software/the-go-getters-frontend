import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import { schedule } from '@netlify/functions';
import axios from 'axios';
import { spotifyDataChanged, youtubeDataChanged } from '../../helpers/data';
import fs from 'fs';
import crypto from 'crypto';
import { Octokit } from '@octokit/core';

const {
  YOUTUBE_API_BASE_URL,
  YOUTUBE_API_KEY,
  YOUTUBE_PLAYLIST_ID,
  SPOTIFY_API_BASE_URL,
  SPOTIFY_API_AUTH_BASE_URL,
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_SHOW_ID,
  GITHUB_API_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPO,
  GITHUB_NAME,
  GITHUB_EMAIL,
} = process.env;
const octokit = new Octokit({ auth: GITHUB_API_TOKEN });

const myHandler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  if (!fs.existsSync('./data')) {
    fs.mkdirSync('./data');
  }

  const spotifyEpisodes = await getSpotifyEpisodes();
  const youtubeEpisodes = await getYoutubeEpisodes();

  const newSpotifyData = spotifyDataChanged(spotifyEpisodes, './data/spotify-episodes.json');
  const newYoutubeData = youtubeDataChanged(youtubeEpisodes, './data/youtube-videos.json');

  if (newSpotifyData || newYoutubeData) {
    console.log('New data found, triggering commit and build pipeline.');
  } else {
    console.log('Data is all up-to-date, skipping rebuild');
    return { statusCode: 200 };
  }

  // Commit to repo
  try {
    const hash = crypto.randomBytes(10).toString('hex');
    const files = [
      { path: 'data/spotify-episodes.json', data: spotifyEpisodes },
      { path: 'data/youtube-videos.json', data: youtubeEpisodes },
    ];

    for (const file of files) {
      const {
        data: { sha },
      } = await octokit.request(`GET /repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.path}`, {
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        file_path: file.path,
      });

      console.log(sha)

      await octokit.request(`PUT /repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.path}`, {
        owner: GITHUB_OWNER as string,
        repo: GITHUB_REPO as string,
        path: file.path,
        message: `Update episode data. Hash: #${hash}`,
        comitter: {
          name: GITHUB_NAME as string,
          email: GITHUB_EMAIL as string,
        },
        content: Buffer.from(JSON.stringify(file.data)).toString('base64'),
        sha,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
    }

    return { statusCode: 200 };
  } catch (err) {
    const message = `Error in git process. [ERROR] ${err}`;

    console.error(message);
    return { statusCode: 500, message };
  }
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
