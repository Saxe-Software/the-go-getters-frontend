import styles from '../styles/components/Episode.module.scss';
import Image from 'next/image';

type EpisodeProps = {
  youtubeVideoId: string;
};

export default function PageSection({ youtubeVideoId }: EpisodeProps) {
  return (
    <div id={styles.episode}>
      <Image src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`} alt='Episode thumbnail' />
    </div>
  );
}
