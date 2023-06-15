export function decorateEpisodeData(episodes: Array<any>): void {
  // Decorate object with episode number
  episodes.forEach(episode => {
    const regex = /#(\d+)/;
    const match = episode.snippet?.title ? episode.snippet.title.match(regex) : episode.name.match(regex);
    const number = match ? parseInt(match[1]) : null;

    episode.episodeNumber = number;
  });
}
