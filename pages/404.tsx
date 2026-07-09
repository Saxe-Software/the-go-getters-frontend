import Link from 'next/link';

export default function Custom404() {
  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 24,
        padding: '140px 40px 60px',
      }}>
      <h1 className='anton' style={{ fontSize: 'clamp(80px,16vw,220px)', lineHeight: 0.85, color: '#E8A838' }}>
        404
      </h1>
      <p style={{ fontSize: 18, color: '#c9c7bf', maxWidth: 380 }}>
        Looks like the page you are looking for doesn&apos;t exist.
      </p>
      <Link href='/'>
        <a className='btnAmber' style={{ padding: '15px 30px', fontSize: 17 }}>
          GO HOME ▸
        </a>
      </Link>
    </div>
  );
}
