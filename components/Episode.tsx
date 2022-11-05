import { useTheme } from '@mui/material/styles';
import { Card, CardMedia, CardContent, CardActionArea, Link, Typography, Skeleton } from '@mui/material';
import styles from '../styles/components/Episode.module.scss';

type EpisodeProps = {
  number: number;
  title?: string;
  youtubeVideoId: string;
};

export default function PageSection({ number, title, youtubeVideoId }: EpisodeProps) {
  const theme = useTheme();

  return (
    <Card variant='outlined'>
      <div className={styles.linkWrapper}>
        <Link href={`/episodes/${number}`} component={CardActionArea}>
          <CardMedia component='img' image={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`} alt='Episode thumbnail' />
          <CardContent style={{ color: theme.palette.text.primary }}>
            <Typography variant='body2'>
              <b>{title}</b>
            </Typography>
          </CardContent>
        </Link>
      </div>
    </Card>
  );
}
