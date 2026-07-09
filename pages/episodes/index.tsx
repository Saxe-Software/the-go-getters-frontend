import Head from 'next/head';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import youtubeVideos from '../../data/youtube-videos.json';
import {
  sortNewestFirst,
  formatEpisodeDate,
  parseGuest,
  parseShortTitle,
  bestThumbnail,
  episodeYears,
} from '../../helpers/episodes.mjs';
import { SPOTIFY_SHOW_URL } from '../../components/Nav';

const PAGE_SIZE = 10;

type EpisodeRow = {
  id: string;
  num: number | null;
  title: string;
  guest: string | null;
  date: string;
  year: number;
  description: string;
  thumbnail: string | null;
};

type EpisodesProps = {
  episodes: EpisodeRow[];
  years: number[];
};

export default function Episodes({ episodes, years }: EpisodesProps) {
  const [filter, setFilter] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(
    () => (filter === 'All' ? episodes : episodes.filter(ep => String(ep.year) === filter)),
    [episodes, filter]
  );
  const visible = filtered.slice(0, visibleCount);
  const featured = episodes[0];

  const selectFilter = (value: string) => {
    setFilter(value);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <>
      <Head>
        <title>Episodes | The Go Getters</title>
      </Head>

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* HEADER */}
        <header style={{ padding: '150px 40px 40px', maxWidth: 1300, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 14,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#E8A838',
              fontWeight: 600,
              marginBottom: 14,
            }}>
            The full archive
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
            }}>
            <h1 className='anton' style={{ fontSize: 'clamp(64px,12vw,180px)', lineHeight: 0.82 }}>
              Episodes
            </h1>
            <p style={{ fontSize: 16, color: '#8A8A82', paddingBottom: 12 }}>
              {episodes.length} conversations &amp; counting · New every week
            </p>
          </div>
        </header>

        {/* FEATURED */}
        {featured && (
          <section style={{ maxWidth: 1300, margin: '0 auto', padding: '20px 40px 60px' }}>
            <div
              className='gridCollapse'
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 0,
                border: '1px solid #22221e',
                borderRadius: 8,
                overflow: 'hidden',
                background: '#141412',
              }}>
              <div style={{ position: 'relative', minHeight: 420, background: '#1c1c18' }}>
                {featured.thumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                )}
                <span
                  className='anton'
                  style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    background: '#E8A838',
                    color: '#0B0B0B',
                    fontSize: 14,
                    padding: '7px 14px',
                    letterSpacing: '.08em',
                  }}>
                  ▸ LATEST DROP
                </span>
              </div>
              <div style={{ padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <p
                  style={{
                    fontSize: 12,
                    letterSpacing: '.22em',
                    textTransform: 'uppercase',
                    color: '#E8A838',
                    fontWeight: 600,
                    marginBottom: 16,
                  }}>
                  {featured.num !== null ? `Episode ${featured.num} · ` : ''}
                  {featured.date}
                </p>
                <h2 className='anton' style={{ fontSize: 'clamp(30px,3.6vw,50px)', lineHeight: 0.98, marginBottom: 18 }}>
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: '#c9c7bf',
                    marginBottom: 28,
                    maxWidth: 460,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                  {featured.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }}>
                  <Link href={`/episodes/${featured.id}`}>
                    <a
                      className='btnAmber'
                      style={{
                        padding: '15px 28px',
                        fontSize: 17,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                      }}>
                      ▸ PLAY EPISODE
                    </a>
                  </Link>
                  {featured.guest && (
                    <span style={{ color: '#8A8A82', fontSize: 14 }}>with {featured.guest}</span>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* FILTER + LIST */}
        <section style={{ maxWidth: 1300, margin: '0 auto', padding: '0 40px 100px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
              paddingBottom: 24,
              borderBottom: '2px solid #22221e',
              marginBottom: 8,
            }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {['All', ...years.map(String)].map(label => {
                const active = label === filter;
                return (
                  <button
                    key={label}
                    onClick={() => selectFilter(label)}
                    style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '.06em',
                      textTransform: 'uppercase',
                      padding: '11px 20px',
                      borderRadius: 2,
                      cursor: 'pointer',
                      transition: 'all .2s',
                      border: `2px solid ${active ? '#E8A838' : '#33332e'}`,
                      background: active ? '#E8A838' : 'transparent',
                      color: active ? '#0B0B0B' : '#c9c7bf',
                    }}>
                    {label}
                  </button>
                );
              })}
            </div>
            <span style={{ fontSize: 13, color: '#8A8A82', letterSpacing: '.06em', textTransform: 'uppercase' }}>
              {visible.length} of {filtered.length} shown
            </span>
          </div>

          <div>
            {visible.map(ep => (
              <Link key={ep.id} href={`/episodes/${ep.id}`}>
                <a
                  className='epRow'
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '70px 1fr auto',
                    gap: 24,
                    alignItems: 'center',
                    padding: '26px 8px',
                    borderBottom: '1px solid #1c1c18',
                  }}>
                  <span className='anton' style={{ fontSize: 34, color: '#3a3a34', lineHeight: 1 }}>
                    {ep.num ?? '—'}
                  </span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                      <span
                        style={{
                          fontSize: 10,
                          letterSpacing: '.18em',
                          textTransform: 'uppercase',
                          fontWeight: 700,
                          color: '#0B0B0B',
                          background: '#E8A838',
                          padding: '4px 9px',
                          borderRadius: 2,
                        }}>
                        Episode
                      </span>
                      <span style={{ fontSize: 12, color: '#6a6a63' }}>{ep.date}</span>
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 700, lineHeight: 1.2, marginBottom: 5 }}>{ep.title}</h3>
                    {ep.guest && <p style={{ fontSize: 14, color: '#8A8A82' }}>with {ep.guest}</p>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
                    <span
                      style={{
                        width: 46,
                        height: 46,
                        border: '2px solid #33332e',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 15,
                        color: '#E8A838',
                        flexShrink: 0,
                      }}>
                      ▸
                    </span>
                  </div>
                </a>
              </Link>
            ))}
          </div>

          {visibleCount < filtered.length && (
            <div style={{ textAlign: 'center', marginTop: 50 }}>
              <button
                className='btnGhost'
                onClick={() => setVisibleCount(count => count + PAGE_SIZE)}
                style={{ padding: '16px 40px', fontSize: 16, letterSpacing: '.04em' }}>
                LOAD OLDER EPISODES
              </button>
            </div>
          )}
        </section>

        {/* SUBSCRIBE STRIP */}
        <section style={{ background: '#E8A838', color: '#0B0B0B', padding: '70px 40px' }}>
          <div
            style={{
              maxWidth: 1300,
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 30,
            }}>
            <h2 className='anton' style={{ fontSize: 'clamp(34px,5vw,64px)', lineHeight: 0.9, maxWidth: 560 }}>
              Never miss a<br />
              drop
            </h2>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={SPOTIFY_SHOW_URL} target='_blank' rel='noreferrer' className='btnInk' style={{ padding: '15px 26px' }}>
                SPOTIFY
              </a>
              <a
                href='https://www.youtube.com/@TheGoGettersYT'
                target='_blank'
                rel='noreferrer'
                className='btnInk'
                style={{ padding: '15px 26px' }}>
                YOUTUBE
              </a>
              <a
                href='https://www.twitch.tv/gogetterslive'
                target='_blank'
                rel='noreferrer'
                className='btnInk'
                style={{ padding: '15px 26px' }}>
                TWITCH
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const withThumbnails = youtubeVideos.filter(
    (video: any) => Object.keys(video.snippet.thumbnails).length > 0
  );

  const episodes = sortNewestFirst(withThumbnails).map((video: any) => ({
    id: video.id,
    num: video.episodeNumber ?? null,
    title: parseShortTitle(video.snippet.title),
    guest: parseGuest(video.snippet.title),
    date: formatEpisodeDate(video.snippet.publishedAt),
    year: new Date(video.snippet.publishedAt).getUTCFullYear(),
    description: (video.snippet.description || '').split('\n')[0],
    thumbnail: bestThumbnail(video.snippet.thumbnails),
  }));

  return { props: { episodes, years: episodeYears(withThumbnails) } };
}
