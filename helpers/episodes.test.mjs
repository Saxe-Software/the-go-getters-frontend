import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  sortNewestFirst,
  formatEpisodeDate,
  parseGuest,
  parseShortTitle,
  bestThumbnail,
  episodeYears,
} from './episodes.mjs';

const vid = (publishedAt, title = 'T') => ({ snippet: { publishedAt, title } });

test('sortNewestFirst orders by publishedAt descending without mutating input', () => {
  const input = [vid('2022-01-01T00:00:00Z'), vid('2023-06-01T00:00:00Z'), vid('2022-08-01T00:00:00Z')];
  const sorted = sortNewestFirst(input);
  assert.deepEqual(
    sorted.map(v => v.snippet.publishedAt),
    ['2023-06-01T00:00:00Z', '2022-08-01T00:00:00Z', '2022-01-01T00:00:00Z']
  );
  assert.equal(input[0].snippet.publishedAt, '2022-01-01T00:00:00Z');
});

test('formatEpisodeDate renders "Mon YYYY"', () => {
  assert.equal(formatEpisodeDate('2022-07-09T13:00:11Z'), 'Jul 2022');
});

test('parseGuest takes text after last dash, stripping episode hash', () => {
  assert.equal(parseGuest('Building The LARGEST Paintball Facility ON EARTH - Sky Fogal #38'), 'Sky Fogal');
  assert.equal(parseGuest('Some Title - Jane Doe'), 'Jane Doe');
});

test('parseGuest returns null when no dash separator', () => {
  assert.equal(parseGuest('Just a trailer'), null);
});

test('parseShortTitle takes text before last dash, stripping episode hash', () => {
  assert.equal(parseShortTitle('Big Topic - Guest Name #12'), 'Big Topic');
});

test('parseShortTitle falls back to full title without dash', () => {
  assert.equal(parseShortTitle('Standalone #3'), 'Standalone');
});

test('parseShortTitle strips trailing "| Go Getters Podcast" branding', () => {
  assert.equal(parseShortTitle("Let's Talk. | Go Getters Podcast"), "Let's Talk.");
  assert.equal(parseShortTitle('Topic | The Go Getters Podcast #99'), 'Topic');
});

test('parseGuest ignores the branding segment after a pipe', () => {
  assert.equal(parseGuest("Let's Talk. | Go Getters Podcast"), null);
  assert.equal(parseGuest('Big Story - Jane Doe | Go Getters Podcast'), 'Jane Doe');
});

test('bestThumbnail prefers maxres then falls back down the ladder', () => {
  assert.equal(bestThumbnail({ maxres: { url: 'M' }, high: { url: 'H' } }), 'M');
  assert.equal(bestThumbnail({ high: { url: 'H' }, default: { url: 'D' } }), 'H');
  assert.equal(bestThumbnail({}), null);
});

test('episodeYears returns unique years newest first', () => {
  const vids = [vid('2021-02-01T00:00:00Z'), vid('2023-01-01T00:00:00Z'), vid('2021-11-01T00:00:00Z')];
  assert.deepEqual(episodeYears(vids), [2023, 2021]);
});
