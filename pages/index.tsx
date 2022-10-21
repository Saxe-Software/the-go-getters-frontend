import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import { getApiData } from '../helpers/api';
import { Card, CardContent, Button, CardMedia, Typography, CardActionArea, Link } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

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
              <Card key={episode.id} variant='outlined'>
                <Link href={`/episodes/${episode.attributes.number}`} component={CardActionArea}>
                  <CardMedia component='img' image={`https://img.youtube.com/vi/${episode.attributes.youtubeVideoId}/maxresdefault.jpg`} alt='Episode thumbnail' />
                  <CardContent>
                    <Typography variant='body2'>
                      <b>{episode.attributes.title}</b>
                    </Typography>
                  </CardContent>
                </Link>
              </Card>
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
