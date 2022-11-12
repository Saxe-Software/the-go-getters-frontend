import styles from '../styles/components/SocialBar.module.scss';
import { mdiYoutube, mdiSpotify, mdiInstagram, mdiTwitch, mdiHandshake } from '@mdi/js';
import Icon from '@mdi/react';
import { useTheme } from '@mui/material/styles';

type SocialBarProps = {
  fixed?: boolean;
  light?: boolean;
};

export default function SocialBar({ fixed, light }: SocialBarProps) {
  const theme = useTheme();

  return (
    <>
      <div className={`${styles.socialBar} ${light ? styles.light : ''}`} style={{ position: fixed ? 'fixed' : 'absolute' }}>
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
        <div>
          <a id={styles.anchor} href='https://anchor.fm/thegogetterspodcast'>
            <Icon path={mdiHandshake} title='Support and Feedback' />
          </a>
        </div>
      </div>

      {/* Unfortunately very hacky ): */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .${styles.socialBar}::after {
            background-color: ${theme.palette.text.primary}
          }

          .${styles.socialBar}.${styles.light}::after {
            background-color: white;
          }

          .${styles.socialBar} > div > a {
            filter: drop-shadow(0 0 0.05rem ${theme.palette.background.paper});
          }
          `,
        }}
      ></style>
    </>
  );
}
