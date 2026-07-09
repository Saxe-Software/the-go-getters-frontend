import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEpisodeData, isSafeToWrite, paginate } from './update-episodes.mjs';

// --- normalizeEpisodeData ---

test('extracts episode number from youtube snippet title', () => {
  const episodes = [{ snippet: { title: 'Big Interview #42 - Someone' } }];
  normalizeEpisodeData(episodes);
  assert.equal(episodes[0].episodeNumber, 42);
});

test('extracts episode number from spotify name', () => {
  const episodes = [{ name: '#7 - First Guest' }];
  normalizeEpisodeData(episodes);
  assert.equal(episodes[0].episodeNumber, 7);
});

test('sets episodeNumber null when title has no number', () => {
  const episodes = [{ name: 'Trailer' }];
  normalizeEpisodeData(episodes);
  assert.equal(episodes[0].episodeNumber, null);
});

test('removes etag field', () => {
  const episodes = [{ snippet: { title: '#1' }, etag: 'abc' }];
  normalizeEpisodeData(episodes);
  assert.equal('etag' in episodes[0], false);
});

// --- isSafeToWrite (the wipe guard) ---

test('rejects empty new data when old data exists', () => {
  assert.equal(isSafeToWrite([{ a: 1 }], []), false);
});

test('rejects new data shrinking below half of old', () => {
  const old = Array.from({ length: 100 }, (_, i) => ({ i }));
  const shrunk = old.slice(0, 49);
  assert.equal(isSafeToWrite(old, shrunk), false);
});

test('accepts growth', () => {
  assert.equal(isSafeToWrite([{ a: 1 }], [{ a: 1 }, { b: 2 }]), true);
});

test('accepts equal length', () => {
  assert.equal(isSafeToWrite([{ a: 1 }], [{ a: 2 }]), true);
});

test('accepts first-ever data when old is empty', () => {
  assert.equal(isSafeToWrite([], [{ a: 1 }]), true);
});

test('rejects empty new data when old is also empty', () => {
  // nothing to write, no reason to touch the file
  assert.equal(isSafeToWrite([], []), false);
});

// --- paginate ---

test('collects items across pages until no next cursor', async () => {
  const pages = {
    '': { items: [1, 2], nextCursor: 'p2' },
    p2: { items: [3], nextCursor: 'p3' },
    p3: { items: [4], nextCursor: null },
  };
  const items = await paginate(async cursor => pages[cursor]);
  assert.deepEqual(items, [1, 2, 3, 4]);
});

test('paginate propagates fetch errors instead of swallowing them', async () => {
  await assert.rejects(
    paginate(async () => {
      throw new Error('api down');
    }),
    /api down/
  );
});
