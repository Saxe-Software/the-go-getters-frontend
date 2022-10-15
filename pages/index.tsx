import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import Episode from '../components/Episode';
import { getApiData } from '../helpers/api';
import Button from '@mui/material/Button';

export default function Home({ title, description, episodes }: any) {
  return (
    <div>
      <Hero description={description} />
      <PageSection title='Latest Episodes'>
        <div id='latest'>
          {episodes
            .reverse()
            .slice(0, 4)
            .map((episode: any) => (
              <Episode key={episode.attributes.youtubeVideoId} youtubeVideoId={episode.attributes.youtubeVideoId} />
            ))}
        </div>
        <Button variant='text'>See all episodes</Button>
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
