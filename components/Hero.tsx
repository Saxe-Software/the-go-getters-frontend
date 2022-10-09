import styles from '../styles/components/Hero.module.scss';
import Image from 'next/image';

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

        <div>
          <a href='/episodes' className='button' id={styles.cta}>
            Start Listening
          </a>
        </div>
      </div>
    </div>
  );
}
