import fs from 'fs';
import { isEqual } from 'lodash';

export function saveSpotifyEpisodes(episodes: Array<any>): boolean {
    // Decorate object with episode number
    episodes.forEach(episode => {
        const regex = /#(\d+)/;
        const match = episode.name.match(regex);
        const number = match ? parseInt(match[1]) : null;

        episode.episodeNumber = number;
    });

    if (isEqual(episodes, JSON.parse(fs.readFileSync('data/spotify-episodes.json', 'utf8')))) {
        console.log('No new Spotify data');
        return false;
    }

    fs.writeFileSync('data/spotify-episodes.json', JSON.stringify(episodes));
    return true;
}

export function saveYoutubeEpisodes(episodes: Array<any>): boolean {
    // Decorate object with episode number
    episodes.forEach(episode => {
        const regex = /#(\d+)/;
        const match = episode.snippet.title.match(regex);
        const number = match ? parseInt(match[1]) : null;

        episode.episodeNumber = number;
    });

    if (isEqual(episodes, JSON.parse(fs.readFileSync('data/youtube-episodes.json', 'utf8')))) {
        console.log('No new Youtube data');
        return false;
    }

    fs.writeFileSync('data/youtube-episodes.json', JSON.stringify(episodes));
    return true;
}
