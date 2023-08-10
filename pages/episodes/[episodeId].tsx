import type { GetStaticPaths } from 'next';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import Head from 'next/head';
import { Link } from '@mui/material';
import PageSection from '../../components/PageSection';
import youtubeVideos from '../../data/youtube-videos.json';
import spotifyEpisodes from '../../data/spotify-episodes.json';
import { formatYoutubeDescription } from '../../helpers';
import YoutubeVideo from '../../types/YoutubeVideo';

export default function Episode(episode: YoutubeVideo) {
  return (
    <>
      <Head>
        <title>{episode.snippet.title} | The Go Getters</title>
      </Head>

      <PageSection>
        <div id='episode'>
          <div id='episode-body'>
            <h1>Episode {episode.snippet.title}</h1>

            <div>
              <div>
                <span>Listen on </span>
                <Link href={`https://www.youtube.com/watch?v=${episode.snippet.resourceId.videoId}`}>Youtube</Link>
                <span> | </span>
                <Link
                  href={
                    spotifyEpisodes.find(spotifyEpisode => spotifyEpisode.episodeNumber === episode.episodeNumber)
                      ?.external_urls.spotify
                  }>
                  Spotify
                </Link>
              </div>

              <iframe
                className='video'
                title='Youtube player'
                sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
                src={`https://youtube.com/embed/${episode.snippet.resourceId.videoId}?autoplay=0`}></iframe>

              <div id='other-episodes'>
                <div>
                  <Link
                    href={`/episodes/${episode.previousEpisodeId}`}
                    style={{ display: episode.episodeNumber === 1 ? 'none' : 'flex' }}>
                    <Icon path={mdiArrowLeft} title='Previous' color='black' />
                    Previous episode
                  </Link>
                </div>

                <div>
                  <Link
                    href={`/episodes/${episode.nextEpisodeId}`}
                    style={{ display: episode.mostRecent ? 'none' : 'flex' }}>
                    Next episode
                    <Icon path={mdiArrowRight} title='Previous' color='black' />
                  </Link>
                </div>
              </div>
            </div>

            {!!episode.snippet.description?.length && (
              <div className='section'>
                <h2>Description</h2>
                <p dangerouslySetInnerHTML={{ __html: formatYoutubeDescription(episode.snippet.description) }}></p>
              </div>
            )}
          </div>
        </div>
      </PageSection>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = youtubeVideos.map(episode => {
    return {
      params: {
        episodeId: episode.id.toString(),
      },
    };
  });

  return { paths, fallback: false };
};

export async function getStaticProps(context: any) {
  const episode = youtubeVideos.find(video => video.id == context.params.episodeId) as YoutubeVideo;
  const ind = (youtubeVideos as YoutubeVideo[]).indexOf(episode);
  const nextEpisode = youtubeVideos[ind + 1];
  const previousEpisode = youtubeVideos[ind - 1];

  if (context.params.nextEpisodeId) episode.mostRecent = true;

  return {
    props: {
      ...episode,
      nextEpisodeId: nextEpisode?.id ?? null,
      previousEpisodeId: previousEpisode?.id ?? null,
    },
  };
}
