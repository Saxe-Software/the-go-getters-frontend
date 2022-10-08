import styles from '../styles/components/Layout.module.scss';
import { PropsWithChildren, useState } from 'react';
import { mdiMenu, mdiClose } from '@mdi/js';
import Link from 'next/link';
import Icon from '@mdi/react';
import Header from '../components/Header';
import Footer from './Footer';
import SocialBar from './SocialBar';

export default function Layout({ children }: PropsWithChildren) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div id={styles.layout}>
      <div id={styles.modal} style={menuOpen ? {} : { display: 'none' }} onClick={() => setMenuOpen(false)}></div>

      <aside onClick={() => setMenuOpen(!menuOpen)}>
        <div id={styles.menuButtons}>
          <p>Menu</p>
          {menuOpen ? <Icon path={mdiClose} title='Close Menu' size={1} /> : <Icon path={mdiMenu} title='Menu' size={1} />}
        </div>
      </aside>

      <div id={styles.menu} style={menuOpen ? {} : { width: 0, padding: 0, opacity: 0 }}>
        <div onClick={() => setMenuOpen(false)} id={styles.closeButton}>
          <Icon path={mdiClose} title='Close Menu' size={1.5} />
        </div>

        <nav onClick={() => setMenuOpen(false)}>
          <Link href='/'>Home</Link>
          <Link href='/episodes'>Episodes</Link>
          <Link href='/contact'>Contact</Link>
          <Link href=''>Shop (Coming soon!)</Link>
        </nav>

        <SocialBar light />
      </div>

      <div id={styles.siteContent}>
        <Header setMenuOpen={setMenuOpen} />
        <main>{children}</main>
        <Footer />

        <div id={styles.mainSocialBar} style={menuOpen ? { display: 'none' } : {}}>
          <SocialBar fixed />
        </div>
      </div>
    </div>
  );
}
