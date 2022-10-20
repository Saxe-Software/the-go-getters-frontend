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
} & PropsWithChildren;

export default function PageSection({ children, title, minHeight, backgroundImage, backgroundColor, backgroundOpacity, backgroundPosition }: PageSectionProps) {
  return (
    <div id={styles.pageSectionWrapper} style={{ backgroundColor, opacity: !backgroundImage ? backgroundOpacity : '' }}>
      <div id={styles.pageSection} style={{ backgroundImage: `url("${backgroundImage}")`, opacity: backgroundOpacity, backgroundPosition, minHeight }}>
        <Typography variant='h3' component='h2' mb={3}>
          {title}
        </Typography>
        {children}
      </div>
    </div>
  );
}
