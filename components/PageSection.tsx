import { PropsWithChildren } from 'react';
import styles from '../styles/components/PageSection.module.scss';

type PageSectionProps = {
  title?: string;
  fullHeight?: boolean;
} & PropsWithChildren;

export default function PageSection({ children, title, fullHeight }: PageSectionProps) {
  return (
    <div id={styles.pageSection} className={fullHeight ? styles.fullHeight : ''}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
