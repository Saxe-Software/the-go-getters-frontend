import styles from '../styles/components/SocialBar.module.scss';
import { mdiYoutube, mdiSpotify, mdiInstagram, mdiTwitch } from '@mdi/js';
import Icon from '@mdi/react';

type SocialBarProps = {
  fixed?: boolean;
  light?: boolean;
};

export default function SocialBar({ fixed, light }: SocialBarProps) {
  return (
    <div className={`${styles.socialBar} ${light ? styles.light : ''}`} style={fixed ? { position: 'fixed' } : {}}>
      <div>
        <a id={styles.spotify} href='https://open.spotify.com/show/1WDdy89IajoQ8qjguLPl94'>
          <Icon path={mdiSpotify} title='Spotify' />
        </a>
      </div>
      <div>
        <a id={styles.youtube} href='https://www.youtube.com/user/kkaskey45'>
          <Icon path={mdiYoutube} title='Youtube' />
        </a>
      </div>
      <div>
        <a id={styles.instagram} href='https://www.instagram.com/gogetterspodcast/'>
          <Icon path={mdiInstagram} title='Instagram' />
        </a>
      </div>
      <div>
        <a id={styles.twitch} href='https://www.twitch.tv/gogetterslive'>
          <Icon path={mdiTwitch} title='Twitch' />
        </a>
      </div>
    </div>
  );
}
