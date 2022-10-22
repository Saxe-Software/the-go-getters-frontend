import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import { getApiData } from '../helpers/api';
import { Button } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Episode from '../components/Episode';

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

export default function Home({ title, description, episodes }: any) {
  return (
    <div id='index'>
      <Hero description={description} />
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
        <p>We're building a fitness, gaming, and lifestyle brand</p>
        <Button></Button>
      </PageSection>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const homepage = await getApiData(`/homepage`, ['*']);
  const episodes = await getApiData(`/episodes`);

  return {
    props: { episodes, ...homepage.attributes },
  };
}
