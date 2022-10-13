import Hero from '../components/Hero';
import PageSection from '../components/PageSection';
import Episode from '../components/Episode';
import axios from 'axios';

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
  const res = await axios.get(`${process.env.API_ROOT}/homepage`, {
    headers: {
      Authorization: `bearer ${process.env.API_KEY}`,
    },
    params: {
      populate: '*',
    },
  });

  console.log(res.data.data.attributes.description)

  return {
    props: res.data.data.attributes,
  };
}
