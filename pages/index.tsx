import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import { Card, Button } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Episode from '../components/Episode';
import { mdiFormatQuoteClose, mdiFormatQuoteOpen } from '@mdi/js';
import Icon from '@mdi/react';
import Head from 'next/head';
import episodes from '../data/youtube-videos.json';

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

const testimonials = [
    { name: 'Matt S.', text: 'As a personal friend of the Go-Getters, I can tell you that these guys truly practice what they preach. They are hardworking and genuine, and their content is very thoughtful.' },
    { name: 'Jordan', text: 'Love to see this coming out of the valley! You guys are onto something with this pod. Only upward for you boys...' },
    { name: 'Justin R.', text: "Good insightful talk from y'all. Nice to see some of the talent coming together and showcasing that there's more opportunity than the 9-5!" },
];

export default function Home() {
    return (
      <>
        <Head>
          <title>Home | The Go Getters</title>
        </Head>

        <div id='index'>
          <Hero />
          <PageSection title='Latest Episodes'>
            <Carousel
              ssr={true}
              responsive={carouselBreakpoints}
              containerClass='carouselContainer'
              itemClass='carouselItem'
              removeArrowOnDeviceType={['md']}>
              {episodes
                .filter(episode => Object.keys(episode.snippet.thumbnails).length > 0)
                // .reverse()
                .slice(0, 10)
                .map((episode: any) => (
                  <Episode
                    key={episode.id}
                    id={episode.id}
                    title={episode.snippet.title}
                    youtubeVideoId={episode.snippet.resourceId.videoId}
                  />
                ))}
            </Carousel>

            <div id='carouselFooter'>
              <Button variant='text' href='/episodes'>
                See all episodes
              </Button>
            </div>
          </PageSection>

          <PageSection
            title="We're more than just a podcast"
            color='white'
            minHeight='40vw'
            backgroundColor='black'
            backgroundImage='/red-bg.jpg'
            backgroundOpacity={0.2}
            backgroundPosition='50% 25%'>
            <p>We&apos;re building a lifestyle, fitness, and gaming brand</p>
          </PageSection>

          <PageSection title='See what the people are saying' maxContentWidth='1600px'>
            <div id='testimonials'>
              {testimonials.map((testimonial: any) => (
                <div className='testimonialWrapper' key={testimonial.name}>
                  <Card variant='outlined'>
                    <div className='testimonialCardContent'>
                      <p className='text'>
                        <Icon path={mdiFormatQuoteOpen} size={1.25} />
                        {testimonial.text}
                        <Icon path={mdiFormatQuoteClose} size={1.25} />
                      </p>

                      <p>- {testimonial.name}</p>
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