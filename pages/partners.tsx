import Head from 'next/head';
import Link from 'next/link';

const reach = [
  { value: '5', label: 'Channels' },
  { value: '18–34', label: 'Core audience' },
  { value: 'Weekly', label: 'New episodes' },
  { value: 'Live', label: 'Twitch community' },
];

const formats = [
  {
    num: '01',
    title: 'Host-read ads',
    text: 'Authentic reads from Kevin & Darrian, woven into the conversation. Pre-roll, mid-roll, or post-roll placement.',
  },
  {
    num: '02',
    title: 'Sponsored episodes',
    text: 'A full episode built around your brand, product, or founder story — distributed across every platform.',
  },
  {
    num: '03',
    title: 'Product placement',
    text: 'Your gear in the studio, on camera, and in the hands of the hosts across YouTube and social clips.',
  },
  {
    num: '04',
    title: 'Live Twitch activations',
    text: 'Real-time shout-outs, giveaways, and gaming collabs with an active, chatty community.',
  },
];

export default function Partners() {
  return (
    <>
      <Head>
        <title>Partners | The Go Getters</title>
      </Head>

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* HERO */}
        <header
          className='gridCollapse'
          style={{
            padding: '160px 40px 40px',
            maxWidth: 1300,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1.2fr .8fr',
            gap: 50,
            alignItems: 'center',
          }}>
          <div>
            <p
              style={{
                fontSize: 14,
                letterSpacing: '.3em',
                textTransform: 'uppercase',
                color: '#E8A838',
                fontWeight: 600,
                marginBottom: 18,
              }}>
              Partner with us
            </p>
            <h1 className='anton' style={{ fontSize: 'clamp(52px,9vw,150px)', lineHeight: 0.82 }}>
              Put your
              <br />
              brand in
              <br />
              the room
            </h1>
            <p style={{ maxWidth: 520, fontSize: 19, lineHeight: 1.6, color: '#c9c7bf', marginTop: 30 }}>
              We reach an engaged, ambitious audience across podcast, YouTube, Twitch, and social. If your brand
              speaks to go-getters, let&apos;s build something real together.
            </p>
            <Link href='/contact'>
              <a
                className='btnAmber'
                style={{ display: 'inline-block', marginTop: 32, padding: '16px 32px', fontSize: 17 }}>
                START A CONVERSATION ▸
              </a>
            </Link>
          </div>
          <div style={{ aspectRatio: '3/4', border: '2px solid #22221e', borderRadius: 14, overflow: 'hidden' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src='/at-table-with-flag.jpg'
              alt='The Go Getters in the studio'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </header>

        {/* REACH STATS */}
        <section style={{ background: '#E8A838', color: '#0B0B0B', padding: '70px 40px', marginTop: 40 }}>
          <div
            className='grid2Collapse'
            style={{
              maxWidth: 1300,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(4,1fr)',
              gap: 20,
              textAlign: 'center',
            }}>
            {reach.map(stat => (
              <div key={stat.label}>
                <div className='anton' style={{ fontSize: 'clamp(40px,5vw,74px)', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    letterSpacing: '.14em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    marginTop: 6,
                  }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WAYS TO PARTNER */}
        <section style={{ maxWidth: 1300, margin: '0 auto', padding: '100px 40px' }}>
          <h2 className='anton' style={{ fontSize: 'clamp(38px,5.5vw,80px)', marginBottom: 14 }}>
            Ways to work
            <br />
            together
          </h2>
          <p style={{ color: '#8A8A82', fontSize: 17, maxWidth: 560, marginBottom: 56 }}>
            Flexible formats built to feel native to the show — never bolted on.
          </p>
          <div
            className='gridCollapse'
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 24 }}>
            {formats.map(format => (
              <div
                key={format.num}
                style={{ background: '#141412', border: '1px solid #22221e', borderRadius: 8, padding: 38 }}>
                <span className='anton' style={{ fontSize: 40, color: '#E8A838' }}>
                  {format.num}
                </span>
                <h3 className='anton' style={{ fontSize: 28, margin: '8px 0 12px' }}>
                  {format.title}
                </h3>
                <p style={{ fontSize: 16, lineHeight: 1.6, color: '#c9c7bf' }}>{format.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* BIG CTA */}
        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '110px 40px', textAlign: 'center' }}>
          <h2 className='anton' style={{ fontSize: 'clamp(44px,7vw,116px)', lineHeight: 0.85 }}>
            Let&apos;s make
            <br />
            some noise
          </h2>
          <p style={{ fontSize: 18, color: '#c9c7bf', margin: '26px 0 34px' }}>
            Reach out for the media kit and rate card. We reply fast.
          </p>
          <a
            href='mailto:Team@thegogetters.co'
            className='btnAmber'
            style={{ padding: '17px 36px', fontSize: 18 }}>
            Team@thegogetters.co
          </a>
        </section>
      </div>
    </>
  );
}
