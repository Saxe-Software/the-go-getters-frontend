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

function guestSeparatorIndex(clean) {
  const dash = clean.lastIndexOf(' - ');
  if (dash !== -1) return { idx: dash, len: 3 };
  const pipe = clean.lastIndexOf(' | ');
  if (pipe !== -1) return { idx: pipe, len: 3 };
  return null;
}

export function parseGuest(title) {
  const clean = stripBranding(title);
  const sep = guestSeparatorIndex(clean);
  if (!sep) return null;
  const guest = stripEpisodeHash(clean.slice(sep.idx + sep.len));
  return guest || null;
}

export function parseShortTitle(title) {
  const clean = stripBranding(title);
  const sep = guestSeparatorIndex(clean);
  return stripEpisodeHash(sep ? clean.slice(0, sep.idx) : clean);
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
