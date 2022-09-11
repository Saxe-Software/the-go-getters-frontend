import styles from '../styles/components/Footer.module.scss';

export default function Footer() {
  return (
    <footer id={styles.footer}>
      <p>
        <span>&copy; </span>
        <span>{new Date(Date.now()).getFullYear()} </span>
        <span>The Go Getters Podcast</span>
      </p>
      <p>
        <span>Built by </span>
        <a href='https://matthewsaxe.com' target='_blank' rel='noreferrer'>
          Matthew Saxe
        </a>
      </p>
    </footer>
  );
}
