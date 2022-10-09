import styles from '../styles/components/Header.module.scss';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import Image from 'next/image'

type HeaderProps = {
  setMenuOpen: Function;
};

export default function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header id={styles.header}>
      <div id={styles.logo}>
        {/* <Image src='/logo.png' alt='Go Getters Logo' width={150} height={40}/> */}
      </div>

      <div id={styles.menuLink} onClick={() => setMenuOpen(true)}>
        <Icon path={mdiMenu} title='Menu' size={1.5} />
      </div>
    </header>
  );
}
