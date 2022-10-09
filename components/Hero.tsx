import styles from '../styles/components/Hero.module.scss';

export default function Hero() {
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

        <div id={styles.description}>
          We sit down with entreprenuers, creatives, athletes, artists, and other go getters.
        </div>

        <div>
        </div>
      </div>
    </div>
  );
}
