import styles from '../styles/components/Header.module.scss';
import { mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';

type HeaderProps = {
  setMenuOpen: Function;
};

export default function Header({ setMenuOpen }: HeaderProps) {
  return (
    <header id={styles.header}>
      <div id={styles.logo}>THE GO GETTERS</div>

      <div id={styles.menuLink} onClick={() => setMenuOpen(true)}>
        <Icon path={mdiMenu} title='Menu' size={1.5} />
      </div>
    </header>
  );
}
