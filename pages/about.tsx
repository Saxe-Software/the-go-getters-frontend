import Head from 'next/head';
import Link from 'next/link';

const hosts = [
  {
    name: 'Kevin Kaskey',
    img: '/kevin1.JPG',
    position: '65% 25%',
    bio: 'A kid with a dream and a passion for podcasting, entertaining, business, fitness, personal development, and gaming — the list goes on. He started this venture as creative expression and a way to give more than he takes. Stick around and enjoy the ride.',
  },
  {
    name: 'Darrian Tyson',
    img: '/darrian1.JPG',
    position: '50% 25%',
    bio: "Half of the duo bringing raw, honest conversation to every episode — from the intellectual to the idiotic. Darrian keeps it real, digs into the stories behind the people, and pushes the mission to show there's more opportunity out there than the 9-to-5.",
  },
];

const topics = [
  { title: 'Mindset', text: 'The mental game behind everyone chasing something bigger.' },
  { title: 'Business', text: 'Founders and hustlers on building something from nothing.' },
  { title: 'Athletics', text: 'Discipline, training, and the grind that carries everywhere.' },
  { title: 'Life Stories', text: 'The intellectual to the idiotic — real talk with real people.' },
];

const stats = [
  { value: '40+', label: 'Episodes' },
  { value: '5', label: 'Platforms' },
  { value: '2', label: 'Hosts, one mission' },
  { value: '∞', label: 'Go-getter energy' },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About | The Go Getters</title>
      </Head>

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* HERO */}
        <header style={{ padding: '160px 40px 70px', maxWidth: 1300, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 14,
              letterSpacing: '.3em',
              textTransform: 'uppercase',
              color: '#E8A838',
              fontWeight: 600,
              marginBottom: 18,
            }}>
            Two kids from the valley
          </p>
          <h1 className='anton' style={{ fontSize: 'clamp(52px,9vw,140px)', lineHeight: 0.85, maxWidth: 1100 }}>
            We&apos;re more than
            <br />
            just a podcast
          </h1>
          <p style={{ maxWidth: 640, fontSize: 20, lineHeight: 1.6, color: '#c9c7bf', marginTop: 34 }}>
            The Go Getters started as two friends from Wilkes-Barre, PA with a mic, a dream, and a hunger to give
            the world more than they took from it. Today it&apos;s a growing lifestyle, fitness, and gaming brand
            built on one idea — <strong style={{ color: '#F4F1E9' }}>it is possible.</strong>
          </p>
        </header>

        {/* STATEMENT STRIP */}
        <div style={{ background: '#E8A838', color: '#0B0B0B', padding: '22px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <div className='anton' style={{ fontSize: 26, letterSpacing: '.04em', textAlign: 'center' }}>
            Mindset ✦ Business ✦ Athletics ✦ Life Stories ✦ Real Conversations ✦ To The Moon
          </div>
        </div>

        {/* HOSTS */}
        <section style={{ maxWidth: 1300, margin: '0 auto', padding: '100px 40px' }}>
          <h2 className='anton' style={{ fontSize: 'clamp(38px,5vw,74px)', marginBottom: 56 }}>
            Meet the hosts
          </h2>
          <div
            className='gridCollapse'
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
            {hosts.map(host => (
              <div key={host.name} style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
                <div
                  style={{
                    width: '100%',
                    aspectRatio: '4/5',
                    border: '2px solid #E8A838',
                    borderRadius: 14,
                    overflow: 'hidden',
                    maxWidth: 420,
                  }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={host.img}
                    alt={host.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: host.position }}
                  />
                </div>
                <div>
                  <h3 className='anton' style={{ fontSize: 40 }}>
                    {host.name}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      letterSpacing: '.16em',
                      textTransform: 'uppercase',
                      color: '#E8A838',
                      fontWeight: 600,
                      margin: '6px 0 18px',
                    }}>
                    Co-host · Wilkes-Barre, PA
                  </p>
                  <p style={{ fontSize: 16, lineHeight: 1.65, color: '#c9c7bf' }}>{host.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WHAT WE COVER */}
        <section
          style={{
            background: '#141412',
            padding: '100px 40px',
            borderTop: '1px solid #22221e',
            borderBottom: '1px solid #22221e',
          }}>
          <div style={{ maxWidth: 1300, margin: '0 auto' }}>
            <h2 className='anton' style={{ fontSize: 'clamp(36px,5vw,72px)', marginBottom: 14 }}>
              What we get into
            </h2>
            <p style={{ color: '#8A8A82', fontSize: 17, maxWidth: 560, marginBottom: 56 }}>
              We take a deep dive into conversation head-on, hitting an array of topics with the people making
              moves.
            </p>
            <div
              className='grid2Collapse'
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20 }}>
              {topics.map(topic => (
                <div key={topic.title} style={{ borderTop: '3px solid #E8A838', paddingTop: 22 }}>
                  <h3 className='anton' style={{ fontSize: 26, marginBottom: 10 }}>
                    {topic.title}
                  </h3>
                  <p style={{ fontSize: 15, color: '#8A8A82', lineHeight: 1.55 }}>{topic.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS */}
        <section style={{ maxWidth: 1300, margin: '0 auto', padding: '100px 40px' }}>
          <div
            className='grid2Collapse'
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 20, textAlign: 'center' }}>
            {stats.map(stat => (
              <div key={stat.label}>
                <div className='anton' style={{ fontSize: 'clamp(48px,6vw,88px)', color: '#E8A838', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <p
                  style={{
                    fontSize: 14,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    color: '#8A8A82',
                    marginTop: 8,
                  }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ background: '#E8A838', color: '#0B0B0B', padding: '100px 40px', textAlign: 'center' }}>
          <h2 className='anton' style={{ fontSize: 'clamp(44px,7vw,110px)', lineHeight: 0.85 }}>
            Come chase it
            <br />
            with us
          </h2>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 34 }}>
            <Link href='/episodes'>
              <a className='btnInk' style={{ padding: '16px 32px', fontSize: 17 }}>
                BROWSE EPISODES ▸
              </a>
            </Link>
            <Link href='/contact'>
              <a
                className='anton'
                style={{
                  border: '2px solid #0B0B0B',
                  color: '#0B0B0B',
                  padding: '14px 32px',
                  fontSize: 17,
                  borderRadius: 2,
                }}>
                BE A GUEST
              </a>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
