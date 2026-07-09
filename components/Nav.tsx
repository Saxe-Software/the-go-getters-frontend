import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const SPOTIFY_SHOW_URL = 'https://open.spotify.com/show/1WDdy89IajoQ8qjguLPl94';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/episodes', label: 'Episodes' },
  { href: '/partners', label: 'Partners' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const overHero = router.pathname === '/';

  const isActive = (href: string) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href);

  return (
    <>
      <nav className={`nav${overHero ? ' overHero' : ''}`}>
        <Link href='/'>
          <a className='brand'>
            <span className='dot' />
            GO&nbsp;GETTERS
          </a>
        </Link>
        <div className='links'>
          {LINKS.map(link => (
            <Link key={link.href} href={link.href}>
              <a className={isActive(link.href) ? 'active' : ''}>{link.label}</a>
            </Link>
          ))}
          <span className='soon'>Shop · Soon</span>
          <a href={SPOTIFY_SHOW_URL} target='_blank' rel='noreferrer' className='listen'>
            LISTEN ▸
          </a>
        </div>
        <button className='burger' onClick={() => setMenuOpen(open => !open)}>
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {menuOpen && (
        <div className='mobileMenu'>
          {LINKS.map(link => (
            <Link key={link.href} href={link.href}>
              <a onClick={() => setMenuOpen(false)}>{link.label}</a>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
