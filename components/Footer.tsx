import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='footer'>
      <div className='inner'>
        <div>
          <p className='wordmark'>Go Getters</p>
          <p className='tagline'>A lifestyle, fitness &amp; gaming podcast out of the valley.</p>
        </div>
        <div className='cols'>
          <div className='col'>
            <Link href='/'>
              <a>Home</a>
            </Link>
            <Link href='/about'>
              <a>About</a>
            </Link>
            <Link href='/episodes'>
              <a>Episodes</a>
            </Link>
          </div>
          <div className='col'>
            <Link href='/partners'>
              <a>Partners</a>
            </Link>
            <Link href='/contact'>
              <a>Contact</a>
            </Link>
            <a href='https://anchor.fm/thegogetterspodcast' target='_blank' rel='noreferrer'>
              Feedback
            </a>
          </div>
        </div>
      </div>
      <div className='legal'>
        <span>© {new Date().getFullYear()} The Go Getters Podcast</span>
        <span>Wilkes-Barre, PA</span>
      </div>
    </footer>
  );
}
