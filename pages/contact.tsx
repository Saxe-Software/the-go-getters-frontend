import Head from 'next/head';
import { useState, ChangeEvent } from 'react';
import { postApiData } from '../helpers/api';
import { validateEmail } from '../helpers';
import { SPOTIFY_SHOW_URL } from '../components/Nav';

const TOPICS = ['Being a guest', 'Brand partnership', 'Collaboration', 'Feedback', 'Something else'];

const inputStyle = {
  background: '#0B0B0B',
  border: '2px solid #22221e',
  borderRadius: 4,
  padding: '14px 16px',
  color: '#F4F1E9',
  fontSize: 15,
  transition: 'border-color .2s',
} as const;

const labelTextStyle = {
  fontSize: 12,
  letterSpacing: '.14em',
  textTransform: 'uppercase',
  color: '#8A8A82',
  fontWeight: 600,
} as const;

const socials = [
  { label: 'Spotify', href: SPOTIFY_SHOW_URL },
  { label: 'YouTube', href: 'https://www.youtube.com/@TheGoGettersYT' },
  { label: 'Twitch', href: 'https://www.twitch.tv/gogetterslive' },
  { label: 'Instagram', href: 'https://www.instagram.com/gogetterspodcast/' },
];

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(TOPICS[0]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const submit = async () => {
    if (!name) return setError('Name is required');
    if (!email || !validateEmail(email)) return setError('A valid email is required');
    if (!message) return setError('Message is required');

    setError('');
    setSending(true);
    try {
      await postApiData('/user-contacts', { name, email, message: `[${topic}] ${message}` });
      setSent(true);
    } catch {
      setError("Something went wrong — try again or email Team@thegogetters.co");
    } finally {
      setSending(false);
    }
  };

  const reset = () => {
    setName('');
    setEmail('');
    setTopic(TOPICS[0]);
    setMessage('');
    setSent(false);
  };

  return (
    <>
      <Head>
        <title>Contact | The Go Getters</title>
      </Head>

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        {/* HERO + FORM */}
        <header
          className='gridCollapse'
          style={{
            padding: '160px 40px 80px',
            maxWidth: 1300,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 70,
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
              Let&apos;s talk
            </p>
            <h1 className='anton' style={{ fontSize: 'clamp(56px,8vw,150px)', lineHeight: 0.82 }}>
              Get in
              <br />
              touch
            </h1>
            <p style={{ maxWidth: 440, fontSize: 18, lineHeight: 1.6, color: '#c9c7bf', marginTop: 28 }}>
              Want to be a guest, pitch a collab, or just say what&apos;s up? Drop us a line — we read everything.
            </p>

            <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 22 }}>
              <div>
                <p style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A8A82', marginBottom: 6 }}>
                  Business &amp; episode inquiries
                </p>
                <a href='mailto:Team@thegogetters.co' className='anton' style={{ fontSize: 26, color: '#E8A838' }}>
                  Team@thegogetters.co
                </a>
              </div>
              <div>
                <p style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#8A8A82', marginBottom: 10 }}>
                  Find us everywhere
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {socials.map(social => (
                    <a
                      key={social.label}
                      href={social.href}
                      target='_blank'
                      rel='noreferrer'
                      className='btnGhost'
                      style={{
                        fontFamily: "'Space Grotesk',sans-serif",
                        padding: '10px 18px',
                        fontWeight: 700,
                        fontSize: 13,
                        letterSpacing: '.05em',
                        textTransform: 'uppercase',
                      }}>
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div style={{ background: '#141412', border: '1px solid #22221e', borderRadius: 10, padding: 44 }}>
            {sent ? (
              <div
                style={{
                  minHeight: 420,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  gap: 18,
                }}>
                <div
                  style={{
                    width: 74,
                    height: 74,
                    borderRadius: '50%',
                    background: '#E8A838',
                    color: '#0B0B0B',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 38,
                  }}>
                  ✓
                </div>
                <h2 className='anton' style={{ fontSize: 38 }}>
                  Message sent!
                </h2>
                <p style={{ color: '#c9c7bf', fontSize: 16, maxWidth: 320 }}>
                  Thanks for reaching out. We&apos;ll get back to you soon — keep being a go-getter.
                </p>
                <button className='btnGhost' onClick={reset} style={{ marginTop: 8, padding: '12px 26px' }}>
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div className='gridCollapse' style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={labelTextStyle}>Name</span>
                    <input
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder='Your name'
                      style={inputStyle}
                    />
                  </label>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <span style={labelTextStyle}>Email</span>
                    <input
                      value={email}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                      placeholder='you@email.com'
                      style={inputStyle}
                    />
                  </label>
                </div>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={labelTextStyle}>I&apos;m reaching out about</span>
                  <select value={topic} onChange={e => setTopic(e.target.value)} style={inputStyle}>
                    {TOPICS.map(option => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span style={labelTextStyle}>Message</span>
                  <textarea
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={5}
                    placeholder="Tell us what's up..."
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </label>
                {error && (
                  <p style={{ color: '#E8A838', fontSize: 14, fontWeight: 600 }}>{error}</p>
                )}
                <button
                  className='btnAmber'
                  onClick={submit}
                  disabled={sending}
                  style={{
                    padding: 16,
                    fontSize: 18,
                    letterSpacing: '.03em',
                    border: 'none',
                    borderRadius: 3,
                    cursor: 'pointer',
                    opacity: sending ? 0.6 : 1,
                  }}>
                  {sending ? 'SENDING…' : 'SEND MESSAGE ▸'}
                </button>
              </div>
            )}
          </div>
        </header>

        {/* BE A GUEST STRIP */}
        <section style={{ background: '#E8A838', color: '#0B0B0B', padding: '80px 40px', textAlign: 'center' }}>
          <p style={{ fontSize: 14, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 700, marginBottom: 14 }}>
            Think you&apos;ve got a story?
          </p>
          <h2 className='anton' style={{ fontSize: 'clamp(40px,6.5vw,100px)', lineHeight: 0.85 }}>
            Come sit down
            <br />
            with us
          </h2>
          <a
            href='mailto:Team@thegogetters.co'
            className='btnInk'
            style={{ display: 'inline-block', marginTop: 30, padding: '16px 34px', fontSize: 17 }}>
            PITCH YOURSELF ▸
          </a>
        </section>
      </div>
    </>
  );
}
