import fs from "fs";
import { isEqual } from "lodash";

export function saveSpotifyEpisodes(episodes: Array<any>, path: string): boolean {
    // Decorate object with episode number
    episodes.forEach((episode) => {
        const regex = /#(\d+)/;
        const match = episode.name.match(regex);
        const number = match ? parseInt(match[1]) : null;

        episode.episodeNumber = number;
    });

    const fileExists: boolean = fs.existsSync(path);
    const newData: boolean = fileExists && !isEqual(episodes, JSON.parse(fs.readFileSync(path, "utf8")));

    if (!fileExists || newData) {
        fs.writeFileSync(path, JSON.stringify(episodes));
    } else {
        console.log("No new Spotify data");
        return false;
    }

    return true;
}

export function saveYoutubeEpisodes(episodes: Array<any>, path: string): boolean {
    // Decorate object with episode number
    episodes.forEach((episode) => {
        const regex = /#(\d+)/;
        const match = episode.snippet.title.match(regex);
        const number = match ? parseInt(match[1]) : null;

        episode.episodeNumber = number;
    });

    const fileExists: boolean = fs.existsSync(path);
    const newData: boolean = fileExists && !isEqual(episodes, JSON.parse(fs.readFileSync(path, "utf8")));

    if (!fileExists || newData) {
        fs.writeFileSync(path, JSON.stringify(episodes));
    } else {
        console.log("No new Youtube data");
        return false;
    }

    return true;
}
