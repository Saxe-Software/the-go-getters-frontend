import { ClassNames } from '@emotion/react';
import { Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import styles from '../styles/components/PageSection.module.scss';

type PageSectionProps = {
  title?: string;
  minHeight?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  backgroundOpacity?: number;
  backgroundPosition?: string;
  color?: string;
  maxContentWidth?: string;
  className?: string;
} & PropsWithChildren;

export default function PageSection({ children, className, title, minHeight, backgroundImage, backgroundColor, backgroundOpacity, backgroundPosition, color, maxContentWidth }: PageSectionProps) {
  return (
    <div className={`pageSectionWrapper ${className}`} id={styles.pageSectionWrapper} style={{ backgroundColor, minHeight }}>
      <div id={styles.pageSectionBackground} style={{ backgroundImage: `url("${backgroundImage}")`, backgroundPosition, opacity: backgroundOpacity }}></div>

      <div id={styles.pageSection} style={{ color, maxWidth: maxContentWidth }}>
        <Typography variant='h3' component='h2' mb={3}>
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
}
