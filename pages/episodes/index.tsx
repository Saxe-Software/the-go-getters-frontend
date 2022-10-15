import { getApiData } from '../../helpers/api';

type EpisodesProps = {
  episodes: Array<any>;
};

export default function Episodes({ episodes }: EpisodesProps) {
  return <div>BREP</div>;
}

export async function getStaticProps(context: any) {
  const episodes = await getApiData(`/episodes`);

  return {
    props: { episodes },
  };
}
