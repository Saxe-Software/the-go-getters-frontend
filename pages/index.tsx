import Head from 'next/head';
import Link from 'next/link';
import youtubeVideos from '../data/youtube-videos.json';
import {
  sortNewestFirst,
  formatEpisodeDate,
  parseGuest,
  parseShortTitle,
  bestThumbnail,
} from '../helpers/episodes.mjs';
import { SPOTIFY_SHOW_URL } from '../components/Nav';

type EpisodeCard = {
  id: string;
  num: number | null;
  title: string;
  guest: string | null;
  date: string;
  thumbnail: string | null;
};

type HomeProps = {
  latest: EpisodeCard[];
};

const testimonials = [
  {
    name: 'Matt S.',
    text: 'As a personal friend of the Go-Getters, I can tell you that these guys truly practice what they preach. They are hardworking and genuine, and their content is very thoughtful.',
  },
  {
    name: 'Jordan',
    text: 'Love to see this coming out of the valley! You guys are onto something with this pod. Only upward for you boys...',
  },
  {
    name: 'Justin R.',
    text: "Good insightful talk from y'all. Nice to see the talent coming together and showing there's more opportunity than the 9-5!",
  },
];

const pillars = [
  {
    num: '01',
    title: 'Lifestyle',
    text: 'Real conversations about grinding toward the life you actually want — no filler, no fluff.',
  },
  {
    num: '02',
    title: 'Fitness',
    text: 'Discipline, training, and the mindset that carries over from the gym into everything else.',
  },
  {
    num: '03',
    title: 'Gaming',
    text: 'Live on Twitch, building a community that plays hard and shows up for each other.',
  },
];

const hosts = [
  { name: 'Kevin Kaskey', img: '/kevin1.JPG', position: '65% 25%', offset: false },
  { name: 'Darrian Tyson', img: '/darrian1.JPG', position: '50% 25%', offset: true },
];

const MARQUEE_WORDS = ['Entrepreneurs', 'Artists', 'Athletes', 'Creatives', 'Founders', 'Gamers', 'Hustlers'];
// One segment must be wider than any viewport; the track holds two identical
// segments and animates -50%, so the loop is seamless with no gap.
const marqueeSegment = Array.from({ length: 4 }, () => MARQUEE_WORDS.map(word => `${word} ✦`).join(' '))
  .join(' ')
  .concat(' ');

export default function Home({ latest }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | The Go Getters</title>
      </Head>

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* HERO */}
        <header
          className='gridCollapse'
          style={{
            position: 'relative',
            minHeight: '100vh',
            padding: '140px 40px 40px',
            display: 'grid',
            gridTemplateColumns: '1.15fr .85fr',
            gap: 20,
            alignItems: 'center',
            overflow: 'hidden',
          }}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at 15% 20%,rgba(204,255,0,.10),transparent 40%),radial-gradient(circle at 85% 80%,rgba(255,59,29,.08),transparent 45%)',
              zIndex: 0,
            }}
          />
          <div style={{ position: 'relative', zIndex: 2 }}>
            <p
              className='rise'
              style={{
                fontSize: 15,
                letterSpacing: '.34em',
                textTransform: 'uppercase',
                color: '#E8A838',
                fontWeight: 600,
                marginBottom: 18,
                animationDelay: '.05s',
              }}>
              Welcome to the
            </p>
            <h1
              className='rise anton'
              style={{
                fontSize: 'clamp(72px,13vw,200px)',
                lineHeight: 0.82,
                letterSpacing: '-.01em',
                animationDelay: '.12s',
              }}>
              Go
              <br />
              Getters
            </h1>
            <p
              className='rise'
              style={{
                maxWidth: 440,
                fontSize: 19,
                lineHeight: 1.5,
                color: '#c9c7bf',
                margin: '28px 0 34px',
                animationDelay: '.22s',
              }}>
              We sit down with entrepreneurs, artists, creatives, athletes, and other amazing go-getters chasing
              the life they want.
            </p>
            <div className='rise' style={{ display: 'flex', gap: 14, flexWrap: 'wrap', animationDelay: '.3s' }}>
              <a
                href={SPOTIFY_SHOW_URL}
                target='_blank'
                rel='noreferrer'
                className='btnAmber'
                style={{ padding: '16px 30px', fontSize: 18, letterSpacing: '.02em' }}>
                LISTEN NOW ▸
              </a>
              <Link href='/episodes'>
                <a className='btnGhost' style={{ padding: '14px 30px', fontSize: 18 }}>
                  ALL EPISODES
                </a>
              </Link>
            </div>
          </div>
          <div
            className='rise'
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(12px, 2vw, 24px)',
              animationDelay: '.4s',
            }}>
            {hosts.map(host => (
              <div key={host.name} style={{ textAlign: 'center', marginTop: host.offset ? 60 : 0 }}>
                <div
                  style={{
                    width: 'clamp(140px, 14vw, 300px)',
                    aspectRatio: '19 / 23',
                    border: '2px solid #E8A838',
                    borderRadius: 200,
                    overflow: 'hidden',
                    animation: 'floaty 6s ease-in-out infinite',
                    animationDelay: host.offset ? '1.5s' : '0s',
                  }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={host.img}
                    alt={host.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: host.position }}
                  />
                </div>
                <p className='anton' style={{ fontSize: 20, marginTop: 14 }}>
                  {host.name}
                </p>
                <p style={{ fontSize: 12, letterSpacing: '.2em', color: '#8A8A82', textTransform: 'uppercase' }}>
                  Host
                </p>
              </div>
            ))}
          </div>
        </header>

        {/* MARQUEE */}
        <div
          style={{
            background: '#E8A838',
            color: '#0B0B0B',
            padding: '16px 0',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            borderTop: '2px solid #0B0B0B',
            borderBottom: '2px solid #0B0B0B',
          }}>
          <div
            className='anton'
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'marquee 26s linear infinite',
              fontSize: 30,
              letterSpacing: '.02em',
            }}>
            <span style={{ whiteSpace: 'pre' }}>{marqueeSegment}</span>
            <span style={{ whiteSpace: 'pre' }} aria-hidden='true'>
              {marqueeSegment}
            </span>
          </div>
        </div>

        {/* LATEST EPISODES */}
        <section style={{ padding: '110px 40px', maxWidth: 1300, margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 20,
              marginBottom: 50,
            }}>
            <h2 className='anton' style={{ fontSize: 'clamp(42px,6vw,86px)', lineHeight: 0.9 }}>
              Latest
              <br />
              Episodes
            </h2>
            <Link href='/episodes'>
              <a
                style={{
                  fontWeight: 700,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  fontSize: 14,
                  borderBottom: '2px solid #E8A838',
                  paddingBottom: 4,
                }}>
                See all episodes →
              </a>
            </Link>
          </div>
          <div
            className='gridCollapse'
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }}>
            {latest.map(ep => (
              <Link key={ep.id} href={`/episodes/${ep.id}`}>
                <a
                  className='epCard'
                  style={{
                    display: 'block',
                    background: '#141412',
                    border: '1px solid #22221e',
                    borderRadius: 6,
                    overflow: 'hidden',
                    transition: 'transform .3s,border-color .3s',
                  }}>
                  <div style={{ position: 'relative', aspectRatio: '16/10', background: '#1c1c18' }}>
                    {ep.thumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={ep.thumbnail}
                        alt={ep.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                    {ep.num !== null && (
                      <span
                        className='anton'
                        style={{
                          position: 'absolute',
                          top: 14,
                          left: 14,
                          background: '#0B0B0B',
                          color: '#E8A838',
                          fontSize: 15,
                          padding: '6px 12px',
                          borderRadius: 2,
                        }}>
                        EP {ep.num}
                      </span>
                    )}
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 14,
                        right: 14,
                        background: 'rgba(11,11,11,.85)',
                        fontSize: 12,
                        fontWeight: 600,
                        padding: '5px 10px',
                        borderRadius: 2,
                      }}>
                      {ep.date}
                    </span>
                  </div>
                  <div style={{ padding: 22 }}>
                    <p
                      style={{
                        fontSize: 11,
                        letterSpacing: '.2em',
                        textTransform: 'uppercase',
                        color: '#E8A838',
                        fontWeight: 600,
                        marginBottom: 10,
                      }}>
                      Episode
                    </p>
                    <h3 style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.2, marginBottom: 10 }}>{ep.title}</h3>
                    {ep.guest && <p style={{ fontSize: 14, color: '#8A8A82', lineHeight: 1.5 }}>with {ep.guest}</p>}
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </section>

        {/* MORE THAN A PODCAST */}
        <section style={{ background: '#F4F1E9', color: '#0B0B0B', padding: '110px 40px' }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <p
              style={{
                fontSize: 14,
                letterSpacing: '.28em',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 16,
                display: 'inline-block',
                background: '#E8A838',
                padding: '6px 12px',
              }}>
              More than a podcast
            </p>
            <h2
              className='anton'
              style={{ fontSize: 'clamp(40px,6.5vw,92px)', lineHeight: 0.9, maxWidth: 900, marginBottom: 60 }}>
              We&apos;re building a lifestyle, fitness &amp; gaming brand
            </h2>
            <div
              className='gridCollapse'
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 26 }}>
              {pillars.map(pillar => (
                <div key={pillar.num} style={{ borderTop: '4px solid #0B0B0B', paddingTop: 24 }}>
                  <span className='anton' style={{ fontSize: 52 }}>
                    {pillar.num}
                  </span>
                  <h3 className='anton' style={{ fontSize: 30, margin: '8px 0 12px' }}>
                    {pillar.title}
                  </h3>
                  <p style={{ fontSize: 16, lineHeight: 1.6, color: '#3a3a34' }}>{pillar.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section style={{ padding: '110px 40px', maxWidth: 1300, margin: '0 auto' }}>
          <h2 className='anton' style={{ fontSize: 'clamp(38px,5.5vw,78px)', lineHeight: 0.9, marginBottom: 56 }}>
            See what the
            <br />
            people are saying
          </h2>
          <div
            className='gridCollapse'
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
            {testimonials.map(quote => (
              <figure
                key={quote.name}
                style={{
                  background: '#141412',
                  border: '1px solid #22221e',
                  borderRadius: 6,
                  padding: '34px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: 280,
                }}>
                <span className='anton' style={{ fontSize: 64, lineHeight: 0.5, color: '#E8A838' }}>
                  &quot;
                </span>
                <blockquote style={{ fontSize: 17, lineHeight: 1.55, color: '#dad8d0', margin: '10px 0 22px' }}>
                  {quote.text}
                </blockquote>
                <figcaption
                  style={{
                    fontWeight: 700,
                    letterSpacing: '.06em',
                    textTransform: 'uppercase',
                    fontSize: 14,
                    color: '#E8A838',
                  }}>
                  — {quote.name}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* SUBSCRIBE CTA */}
        <section style={{ background: '#E8A838', color: '#0B0B0B', padding: '100px 40px' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
            <h2 className='anton' style={{ fontSize: 'clamp(48px,8vw,120px)', lineHeight: 0.85 }}>
              Don&apos;t just
              <br />
              watch. Go get it.
            </h2>
            <p style={{ fontSize: 18, fontWeight: 600, margin: '26px 0 34px' }}>
              New episodes every week. Follow us wherever you listen.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
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
              <a
                href='https://www.instagram.com/gogetterspodcast/'
                target='_blank'
                rel='noreferrer'
                className='btnInk'
                style={{ padding: '15px 26px' }}>
                INSTAGRAM
              </a>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const latest = sortNewestFirst(
    youtubeVideos.filter((video: any) => Object.keys(video.snippet.thumbnails).length > 0)
  )
    .slice(0, 3)
    .map((video: any) => ({
      id: video.id,
      num: video.episodeNumber ?? null,
      title: parseShortTitle(video.snippet.title),
      guest: parseGuest(video.snippet.title),
      date: formatEpisodeDate(video.snippet.publishedAt),
      thumbnail: bestThumbnail(video.snippet.thumbnails),
    }));

  return { props: { latest } };
}
