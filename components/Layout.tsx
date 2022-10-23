import styles from '../styles/components/Layout.module.scss';
import { PropsWithChildren, useState } from 'react';
import { mdiMenu, mdiClose, mdiWeatherNight, mdiWeatherSunny } from '@mdi/js';
import Link from 'next/link';
import Icon from '@mdi/react';
import Header from '../components/Header';
import Footer from './Footer';
import SocialBar from './SocialBar';
import { useTheme } from '@mui/material/styles';
import DarkModeSwitch from './DarkModeSwitch';

type LayoutProps = {
  darkMode: boolean;
  setDarkMode: Function;
} & PropsWithChildren;

export default function Layout({ children, darkMode, setDarkMode }: LayoutProps) {
  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div id={styles.layout}>
      <div id={styles.modal} style={menuOpen ? {} : { display: 'none' }} onClick={() => setMenuOpen(false)}></div>

      <aside onClick={() => setMenuOpen(!menuOpen)} style={{ borderRightWidth: menuOpen ? '1px' : '0', backgroundColor: theme.palette.menu?.main, color: theme.palette.menu?.contrastText }}>
        <div id={styles.menuButtons}>
          <p>Menu</p>
          {menuOpen ? <Icon path={mdiClose} title='Close Menu' size={1} /> : <Icon path={mdiMenu} title='Menu' size={1} />}
        </div>
      </aside>

      <div id={styles.menu} style={menuOpen ? { backgroundColor: theme.palette.menu?.main, color: theme.palette.menu?.contrastText } : { width: 0, padding: 0, opacity: 0 }}>
        <div id={styles.menuHeader}>
          <div onClick={() => setMenuOpen(false)} id={styles.closeButton}>
            <Icon path={mdiClose} title='Close Menu' size={1.5} />
          </div>

          <div className={styles.themeWrapper}>
            <DarkModeSwitch sx={{ m: 1 }} onChange={() => setDarkMode(!darkMode)} />
            {/* <Switch checked={darkMode}  color='default' /> */}
            {/* <Icon path={darkMode ? mdiWeatherNight : mdiWeatherSunny} size={1}></Icon> */}
          </div>
        </div>

        <nav onClick={() => setMenuOpen(false)}>
          <Link href='/'>Home</Link>
          <Link href='/about'>About us</Link>
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
