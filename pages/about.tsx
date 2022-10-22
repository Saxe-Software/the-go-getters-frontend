import { Typography } from '@mui/material';
import PageSection from '../components/PageSection';

export default function About() {
  return (
    <div id='about'>
      <PageSection>
        <Typography variant='h2'>About us</Typography>
        <div id='imageWrapper'>
          <img src='/at-table-with-flag.jpg' alt='The Go Getters' />
        </div>

        <div id='aboutText'>
          <Typography>WORDS WORDS WORDS WORDS WORDS WORDS WORDS WORDS WORDS WORDS WORDS WORDS</Typography>
        </div>
      </PageSection>
    </div>
  );
}
