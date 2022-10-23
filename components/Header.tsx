import styles from '../styles/components/Header.module.scss';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import { useTheme } from '@mui/material/styles';
import DarkModeSwitch from './DarkModeSwitch';
import Link from 'next/link';

type HeaderProps = {
  setMenuOpen: Function;
  darkMode: boolean;
  setDarkMode: Function;
};

export default function Header({ setMenuOpen, darkMode, setDarkMode }: HeaderProps) {
  const theme = useTheme();

  return (
    <header id={styles.header}>
      <div id={styles.logo}>
        <Link href='/'>
          <img src={`/logo_${theme.palette.mode}.png`} alt='Go Getters Logo' />
        </Link>
      </div>

      <div>
        <DarkModeSwitch sx={{ m: 1 }} onChange={() => setDarkMode(!darkMode)} checked={darkMode} />
      </div>

      <div id={styles.menuLink} onClick={() => setMenuOpen(true)}>
        <Icon path={mdiMenu} title='Menu' size={1.5} />
      </div>
    </header>
  );
}
