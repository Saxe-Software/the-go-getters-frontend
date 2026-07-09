// Pure helpers for shaping youtube-videos.json data for the redesigned pages.
// Plain .mjs (not .ts) so `npm test` can run them directly with node --test.

export function sortNewestFirst(videos) {
  return [...videos].sort(
    (a, b) => new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
  );
}

export function formatEpisodeDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
}

function stripEpisodeHash(text) {
  return text.replace(/#\d+\s*$/, '').trim();
}

function stripBranding(title) {
  // Newer uploads append "| Go Getters Podcast" / "| The Go Getters Podcast #N"
  return title.replace(/\s*\|\s*(the\s+)?go[\s-]?getters\s+podcast.*$/i, '').trim();
}

export function parseGuest(title) {
  const clean = stripBranding(title);
  const idx = clean.lastIndexOf(' - ');
  if (idx === -1) return null;
  const guest = stripEpisodeHash(clean.slice(idx + 3));
  return guest || null;
}

export function parseShortTitle(title) {
  const clean = stripBranding(title);
  const idx = clean.lastIndexOf(' - ');
  return stripEpisodeHash(idx === -1 ? clean : clean.slice(0, idx));
}

export function bestThumbnail(thumbnails) {
  for (const size of ['maxres', 'standard', 'high', 'medium', 'default']) {
    if (thumbnails?.[size]?.url) return thumbnails[size].url;
  }
  return null;
}

export function episodeYears(videos) {
  const years = new Set(videos.map(v => new Date(v.snippet.publishedAt).getUTCFullYear()));
  return [...years].sort((a, b) => b - a);
}
