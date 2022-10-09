import styles from '../styles/components/Hero.module.scss';
import Image from 'next/image'

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
          <a href='/episodes' className='button'>
            Start Listening
          </a>
        </div>
      </div>

      <div id={styles.heroImages}>
        <div id={styles.abstractIcon}>
          <div>......</div>
          <div>......</div>
          <div>......</div>
          <div>......</div>
          <div>......</div>
        </div>
        <Image src='https://images.unsplash.com/photo-1581547848331-0aba76655842?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='Co-host' />
        <Image src='https://images.unsplash.com/photo-1581368129682-e2d66324045b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' alt='Co-host' />
      </div>
    </div>
  );
}
