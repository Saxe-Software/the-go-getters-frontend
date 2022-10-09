import { PropsWithChildren } from 'react';
import styles from '../styles/components/PageSection.module.scss';

type PageSectionProps = {
  title: string;
} & PropsWithChildren;

export default function PageSection({ children, title }: PageSectionProps) {
  return (
    <div id={styles.pageSection}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
