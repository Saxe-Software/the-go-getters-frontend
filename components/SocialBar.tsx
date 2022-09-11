import styles from '../styles/components/SocialBar.module.scss';
import { mdiYoutube, mdiSpotify, mdiInstagram, mdiFacebook } from '@mdi/js';
import Icon from '@mdi/react';

type SocialBarProps = {
  fixed?: boolean;
};

export default function SocialBar({ fixed }: SocialBarProps) {
  return (
    <div className={styles.socialBar} style={fixed ? { position: 'fixed' } : {}}>
      <div>
        <a id={styles.youtube}>
          <Icon path={mdiYoutube} title='Youtube' />
        </a>
      </div>
      <div>
        <a id={styles.spotify}>
          <Icon path={mdiSpotify} title='Spotify' />
        </a>
      </div>
      <div>
        <a id={styles.instagram}>
          <Icon path={mdiInstagram} title='Instagram' />
        </a>
      </div>
      <div>
        <a id={styles.facebook}>
          <Icon path={mdiFacebook} title='Facebook' />
        </a>
      </div>
    </div>
  );
}
