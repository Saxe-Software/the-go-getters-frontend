import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import Episode from '../components/Episode';
import { getApiData } from '../helpers/api';

export default function Home({ description }: any) {
  return (
    <div>
      <Hero description={description} />
      <PageSection title='Latest Episodes'>
        <div id='latest'>
          <Episode youtubeVideoId='SqWyB0aYiDA' />
          <Episode youtubeVideoId='SqWyB0aYiDA' />
          <Episode youtubeVideoId='SqWyB0aYiDA' />
          <Episode youtubeVideoId='SqWyB0aYiDA' />
        </div>
      </PageSection>
    </div>
  );
}

export async function getStaticProps(context: any) {
  const homepage = await getApiData(`/homepage`, {
    params: {
      populate: '*',
    },
  });

  return {
    props: homepage.attributes,
  };
}
