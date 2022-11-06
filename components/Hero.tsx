import { Button, Typography } from '@mui/material';
import styles from '../styles/components/Hero.module.scss';
import { Headphones } from '@mui/icons-material';

export default function Hero({ description }: any) {
  return (
    <div id={styles.hero}>
      <div id={styles.heroContent}>
        <div id={styles.subtitle}>Welcome to</div>

        <div id={styles.title}>
          The
          <br />
          Go
          <br />
          Getters
          <br />
        </div>

        <div id={styles.description}>{description}</div>

        <Button href='https://open.spotify.com/show/1WDdy89IajoQ8qjguLPl94?si=4e48f4a4ecda4d3c' variant='contained' id={styles.cta} size='large' startIcon={<Headphones />}>
          Listen now
        </Button>
      </div>

      <div id={styles.heroImages}>
        <Typography id={styles.abstractIcon} color='primary' fontFamily='inherit'>
          ........
          <br />
          ........
          <br />
          ........
          <br />
          ........
          <br />
          ........
          <br />
        </Typography>

        <div>
          <img src='kevin1-oval.png' />
          <Typography color='primary' variant='h6' textAlign='center'>
            <b>Kevin Kaskey</b>
          </Typography>
        </div>

        <div>
          <img src='darrian1-oval.png' />
          <Typography color='primary' variant='h6' textAlign='center'>
            <b>Darrian Tyson</b>
          </Typography>
        </div>
      </div>
    </div>
  );
}
