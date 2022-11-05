import Head from 'next/head';
import Episode from '../../components/Episode';
import PageSection from '../../components/PageSection';
import { getApiData } from '../../helpers/api';
import { CircularProgress, Container } from '@mui/material';

type EpisodesProps = {
  episodes: Array<any>;
};

export default function Episodes({ episodes }: EpisodesProps) {
  return (
    <>
      <Head>
        <title>Episodes | The Go Getters</title>
      </Head>

      <PageSection title='All Episodes'>
        <div className='episodeList'>
          {episodes
            .reverse()
            .map((episode: any) => (
              <div key={episode.id} className='episodeWrapper'>
                <Episode number={episode.attributes.number} title={`Ep. ${episode.attributes.number} ${episode.attributes.title}`} youtubeVideoId={episode.attributes.youtubeVideoId} />
              </div>
            ))}
        </div>
      </PageSection>
    </>
  );
}

export async function getStaticProps(context: any) {
  const episodes = await getApiData(`/episodes`);

  return {
    props: { episodes },
  };
}
