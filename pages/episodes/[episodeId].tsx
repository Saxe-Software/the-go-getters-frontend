import type { GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import youtubeVideos from '../../data/youtube-videos.json';
import spotifyEpisodes from '../../data/spotify-episodes.json';
import { formatYoutubeDescription } from '../../helpers';
import { formatEpisodeDate, parseGuest, parseShortTitle } from '../../helpers/episodes.mjs';
import YoutubeVideo from '../../types/YoutubeVideo';

export default function Episode(episode: YoutubeVideo) {
  const spotifyUrl = spotifyEpisodes.find(
    spotifyEpisode => spotifyEpisode.episodeNumber === episode.episodeNumber
  )?.external_urls.spotify;
  const guest = parseGuest(episode.snippet.title);

  return (
    <>
      <Head>
        <title>{`${episode.snippet.title} | The Go Getters`}</title>
      </Head>

      <div style={{ position: 'relative', minHeight: '100vh' }}>
        <header style={{ padding: '150px 40px 30px', maxWidth: 1100, margin: '0 auto' }}>
          <p
            style={{
              fontSize: 13,
              letterSpacing: '.24em',
              textTransform: 'uppercase',
              color: '#E8A838',
              fontWeight: 600,
              marginBottom: 16,
            }}>
            {episode.episodeNumber !== null && episode.episodeNumber !== undefined
              ? `Episode ${episode.episodeNumber} · `
              : ''}
            {formatEpisodeDate(episode.snippet.publishedAt)}
          </p>
          <h1 className='anton' style={{ fontSize: 'clamp(36px,5.5vw,80px)', lineHeight: 0.92 }}>
            {parseShortTitle(episode.snippet.title)}
          </h1>
          {guest && (
            <p style={{ fontSize: 18, color: '#8A8A82', marginTop: 18 }}>with {guest}</p>
          )}

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '30px 0 10px' }}>
            <a
              href={`https://www.youtube.com/watch?v=${episode.snippet.resourceId.videoId}`}
              target='_blank'
              rel='noreferrer'
              className='btnGhost'
              style={{
                fontFamily: "'Space Grotesk',sans-serif",
                padding: '10px 18px',
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '.05em',
                textTransform: 'uppercase',
              }}>
              Watch on YouTube
            </a>
            {spotifyUrl && (
              <a
                href={spotifyUrl}
                target='_blank'
                rel='noreferrer'
                className='btnGhost'
                style={{
                  fontFamily: "'Space Grotesk',sans-serif",
                  padding: '10px 18px',
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: '.05em',
                  textTransform: 'uppercase',
                }}>
                Listen on Spotify
              </a>
            )}
          </div>
        </header>

        <section style={{ maxWidth: 1100, margin: '0 auto', padding: '10px 40px 40px' }}>
          <iframe
            title='Youtube player'
            sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation'
            src={`https://youtube.com/embed/${episode.snippet.resourceId.videoId}?autoplay=0`}
            style={{
              width: '100%',
              aspectRatio: '16/9',
              border: '1px solid #22221e',
              borderRadius: 8,
              background: '#141412',
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 20,
              margin: '26px 0',
              fontWeight: 600,
              letterSpacing: '.06em',
              textTransform: 'uppercase',
              fontSize: 14,
            }}>
            <div>
              {episode.previousEpisodeId && (
                <Link href={`/episodes/${episode.previousEpisodeId}`}>
                  <a style={{ color: '#E8A838' }}>← Previous episode</a>
                </Link>
              )}
            </div>
            <div>
              {episode.nextEpisodeId && (
                <Link href={`/episodes/${episode.nextEpisodeId}`}>
                  <a style={{ color: '#E8A838' }}>Next episode →</a>
                </Link>
              )}
            </div>
          </div>

          {!!episode.snippet.description?.length && (
            <div
              style={{
                background: '#141412',
                border: '1px solid #22221e',
                borderRadius: 8,
                padding: '34px 30px',
                marginBottom: 60,
              }}>
              <h2 className='anton' style={{ fontSize: 28, marginBottom: 16 }}>
                Description
              </h2>
              <p
                style={{ fontSize: 16, lineHeight: 1.65, color: '#c9c7bf', overflowWrap: 'break-word' }}
                dangerouslySetInnerHTML={{ __html: formatYoutubeDescription(episode.snippet.description) }}
              />
            </div>
          )}
        </section>
      </div>
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

  return {
    props: {
      ...episode,
      nextEpisodeId: nextEpisode?.id ?? null,
      previousEpisodeId: previousEpisode?.id ?? null,
    },
  };
}
