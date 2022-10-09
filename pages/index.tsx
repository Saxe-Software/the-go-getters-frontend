import type { NextPage } from 'next';
import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import Episode from '../components/Episode';

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <PageSection title='Latest Episodes'>
        <div id='latest'>
          <Episode youtubeVideoId='SqWyB0aYiDA' />
          <Episode youtubeVideoId='SqWyB0aYiDA' />
          <Episode youtubeVideoId='SqWyB0aYiDA' />
        </div>
      </PageSection>
    </div>
  );
};

export default Home;
