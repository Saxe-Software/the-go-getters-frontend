import styles from '../styles/components/Episode.module.scss';

type EpisodeProps = {
  youtubeVideoId: string;
};

export default function PageSection({ youtubeVideoId }: EpisodeProps) {
  return (
    <div id={styles.episode}>
      <img src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`} alt='Episode thumbnail' />
    </div>
  );
}
