import styles from '../styles/components/Hero.module.scss';

export default function Hero({ description }: any) {
  return (
    <div id={styles.hero}>
      <div id={styles.heroContent}>
        {/* <div id={styles.subtitle}>Welcome to</div>

        <div id={styles.title}>
          The
          <br />
          Go
          <br />
          Getters
          <br />
        </div>

        <div id={styles.description}>{description}</div> */}
      </div>
    </div>
  );
}
