import { Link, Typography } from '@mui/material';
import PageSection from '../components/PageSection';
import Head from 'next/head';
import { getApiData } from '../helpers/api';

export default function About({ sections }: any) {
  return (
    <>
      <Head>
        <title>About | The Go Getters</title>
      </Head>

      <div id='about'>
        <PageSection>
          <Typography variant='h2' component='h1'>
            About us
          </Typography>
          <div id='imageWrapper'>
            <img src='/at-table-with-flag.jpg' alt='The Go Getters' />
          </div>

          {sections.map((section: any) => (
            <PageSection key={section.id} title={section.title} maxContentWidth='1000px' className='aboutPageSection'>
              <p>{section.text}</p>

              {section.links.map((link: any) => (
                <div key={link.url}>
                  <Link href={link.url}>{link.label}</Link>
                </div>
              ))}
            </PageSection>
          ))}
        </PageSection>
      </div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const aboutPage = await getApiData(`/about-page`, ['sections.links']);

  return {
    props: { ...aboutPage.attributes },
  };
}
