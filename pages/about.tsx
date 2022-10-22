import { Typography } from '@mui/material';
import PageSection from '../components/PageSection';

export default function About() {
  return (
    <div id='about'>
      <PageSection>
        <Typography variant='h2' component='h1'>
          About us
        </Typography>
        <div id='imageWrapper'>
          <img src='/at-table-with-flag.jpg' alt='The Go Getters' />
        </div>

        <PageSection title='The Go Getters' maxContentWidth='1000px' className='aboutPageSection'>
          <p>WORDS WORDS WORDS WORDS</p>
        </PageSection>

        <PageSection title='Kevin Kaskey' maxContentWidth='1000px' className='aboutPageSection'>
          <p>WORDS WORDS WORDS WORDS</p>
        </PageSection>

        <PageSection title='Darrian Tyson' maxContentWidth='1000px' className='aboutPageSection'>
          <p>WORDS WORDS WORDS WORDS</p>
        </PageSection>
      </PageSection>
    </div>
  );
}
