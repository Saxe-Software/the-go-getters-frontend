import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import { getApiData } from '../helpers/api';
import { Card, Button } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Episode from '../components/Episode';
import { mdiFormatQuoteClose, mdiFormatQuoteOpen, mdiMenu } from '@mdi/js';
import Icon from '@mdi/react';
import Head from 'next/head';

const carouselBreakpoints = {
  xxl: {
    breakpoint: { max: 4000, min: 1200 },
    items: 4,
  },
  xl: {
    breakpoint: { max: 1200, min: 992 },
    items: 3,
  },
  lg: {
    breakpoint: { max: 992, min: 768 },
    items: 2,
  },
  md: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
  },
};

export default function Home({ title, description, episodes, testimonials }: any) {
  return (
    <>
      <Head>
        <title>Home | The Go Getters</title>
      </Head>

      <div id='index'>
        {/* <Hero description={description} /> */}
        <PageSection title='Latest Episodes'>
          <Carousel ssr={true} partialVisible responsive={carouselBreakpoints} containerClass='carouselContainer' itemClass='carouselItem' removeArrowOnDeviceType={['md']}>
            {episodes
              .reverse()
              .slice(0, 8)
              .map((episode: any) => (
                <Episode key={episode.id} number={episode.attributes.number} title={`Ep. ${episode.attributes.number} ${episode.attributes.title}`} youtubeVideoId={episode.attributes.youtubeVideoId} />
              ))}
          </Carousel>

          <div id='carouselFooter'>
            <Button variant='text'>See all episodes</Button>
          </div>
        </PageSection>

        <PageSection title="We're more than just a podcast" color='white' minHeight='40vw' backgroundColor='black' backgroundImage='/at-table-with-flag.jpg' backgroundOpacity={0.2} backgroundPosition='50% 25%'>
          <p>We're building a lifestyle, fitness, and gaming brand</p>
          <Button variant='contained'>Fitness</Button>
        </PageSection>

        <PageSection title='See what the people are saying' maxContentWidth='1600px'>
          <div id='testimonials'>
            {testimonials.map((testimonial: any) => (
              <div className='testimonialWrapper' key={testimonial.id}>
                <Card variant='outlined'>
                  <div className='testimonialCardContent'>
                    <p className='text'>
                      <Icon path={mdiFormatQuoteOpen} size={1.25} />
                      {testimonial.attributes.text}
                      <Icon path={mdiFormatQuoteClose} size={1.25} />
                    </p>

                    <p>- {testimonial.attributes.name}</p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </PageSection>
      </div>
    </>
  );
}

export async function getStaticProps(context: any) {
  const homepage = await getApiData(`/homepage`, ['*']);
  const episodes = await getApiData(`/episodes`);
  const testimonials = await getApiData('/testimonials');

  return {
    props: { episodes, ...homepage.attributes, testimonials },
  };
}
