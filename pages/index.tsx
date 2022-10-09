import type { NextPage } from 'next';
import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import Episode from '../components/Episode';

const Home: NextPage = () => {
  return (
    <div>
      <Hero />
      <PageSection title='Latest Episodes'>
        <Episode youtubeVideoId='SqWyB0aYiDA'/>
      </PageSection>
    </div>
  );
};

export default Home;
