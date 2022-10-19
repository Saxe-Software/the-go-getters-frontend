import Episode from '../../components/Episode';
import PageSection from '../../components/PageSection';
import { getApiData } from '../../helpers/api';

type EpisodesProps = {
  episodes: Array<any>;
};

export default function Episodes({ episodes }: EpisodesProps) {
  return (
    <>
      <PageSection title='All Episodes'>
        <div className='episodeList'>
          {episodes.reverse().map((episode: any) => (
            <Episode key={episode.id} number={episode.attributes.number} title={`Ep. ${episode.attributes.number} ${episode.attributes.title}`} youtubeVideoId={episode.attributes.youtubeVideoId} />
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
