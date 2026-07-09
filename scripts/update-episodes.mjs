// Fetches Spotify + YouTube episode data and writes data/*.json.
// Run by .github/workflows/update-episodes.yml on an hourly cron.
// Exits non-zero on fetch failure so the workflow surfaces it — it never
// writes empty/shrunken data over good data (the old Netlify function did,
// which is how the site lost all its episodes).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const {
  YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3',
  YOUTUBE_API_KEY,
  YOUTUBE_PLAYLIST_ID,
  SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1',
  SPOTIFY_API_AUTH_BASE_URL = 'https://accounts.spotify.com/api',
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_SHOW_ID,
} = process.env;

export function normalizeEpisodeData(episodes) {
  episodes.forEach(episode => {
    const title = episode.snippet?.title ?? episode.name;
    const match = title.match(/#(\d+)/);
    episode.episodeNumber = match ? parseInt(match[1]) : null;
    delete episode.etag;
  });
}

export function isSafeToWrite(oldData, newData) {
  if (newData.length === 0) return false;
  if (newData.length < oldData.length / 2) return false;
  return true;
}

export async function paginate(fetchPage) {
  const items = [];
  let cursor = '';
  while (cursor !== null && cursor !== undefined) {
    const page = await fetchPage(cursor);
    items.push(...page.items);
    cursor = page.nextCursor ?? null;
  }
  return items;
}

async function getJson(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} from ${url}: ${await res.text()}`);
  return res.json();
}

async function getSpotifyToken() {
  const basic = Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString('base64');
  const data = await getJson(`${SPOTIFY_API_AUTH_BASE_URL}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${basic}`,
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }),
  });
  return data.access_token;
}

async function getSpotifyEpisodes() {
  const token = await getSpotifyToken();
  const pageSize = 50;
  return paginate(async cursor => {
    const offset = cursor === '' ? 0 : cursor;
    const params = new URLSearchParams({ limit: pageSize, market: 'US', offset });
    const data = await getJson(`${SPOTIFY_API_BASE_URL}/shows/${SPOTIFY_SHOW_ID}/episodes?${params}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { items: data.items, nextCursor: data.next ? Number(offset) + pageSize : null };
  });
}

async function getYoutubeEpisodes() {
  return paginate(async cursor => {
    const params = new URLSearchParams({
      key: YOUTUBE_API_KEY,
      playlistId: YOUTUBE_PLAYLIST_ID,
      part: 'snippet,id',
      maxResults: 50,
      type: 'video',
    });
    if (cursor) params.set('pageToken', cursor);
    const data = await getJson(`${YOUTUBE_API_BASE_URL}/playlistItems?${params}`);
    return { items: data.items, nextCursor: data.nextPageToken ?? null };
  });
}

async function updateFile(relativePath, newData) {
  const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', relativePath);
  const oldData = JSON.parse(await readFile(filePath, 'utf8'));

  if (!isSafeToWrite(oldData, newData)) {
    throw new Error(
      `Refusing to write ${relativePath}: fetched ${newData.length} items but file has ${oldData.length}`
    );
  }

  await writeFile(filePath, JSON.stringify(newData));
  console.log(`${relativePath}: ${oldData.length} -> ${newData.length} items`);
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isMain) {
  const spotifyEpisodes = await getSpotifyEpisodes();
  const youtubeEpisodes = await getYoutubeEpisodes();
  normalizeEpisodeData(spotifyEpisodes);
  normalizeEpisodeData(youtubeEpisodes);
  await updateFile('data/spotify-episodes.json', spotifyEpisodes);
  await updateFile('data/youtube-videos.json', youtubeEpisodes);
}
