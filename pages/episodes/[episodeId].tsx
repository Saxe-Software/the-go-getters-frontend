import type { GetStaticPaths, NextPage } from 'next';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import { getApiData } from '../../helpers/api';
import Head from 'next/head';

type EpisodeProps = {
  id: number;
  number: number;
  title: string;
  description: string;
  youtubeVideoId: string;
  mostRecent: boolean;
  links: {
    youtube: string;
    spotify: string;
  };
  guests: Array<any>;
  additionalSections: Array<any>;
};

export default function Episode(episode: EpisodeProps) {
  return (
    <>
      <Head>
        <title>
          Ep. #{episode.number} - {episode.title} | The Go Getters
        </title>
      </Head>

      <div id='episode'>
        <div id='episode-body'>
          <h1>
            Episode #{episode.number}: {episode.title}
          </h1>

          <div>
            <div>
              <span>Listen on </span>
              <a href={episode.links.youtube}>Youtube</a>
              <span> | </span>
              <a href={episode.links.spotify}>Spotify</a>
            </div>

            <iframe className='video' title='Youtube player' sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' src={`https://youtube.com/embed/${episode.youtubeVideoId}?autoplay=0`}></iframe>

            <div id='other-episodes'>
              <div>
                <a href={`/episodes/${episode.number - 1}`} style={{ display: episode.number === 1 ? 'none' : 'flex' }}>
                  <Icon path={mdiArrowLeft} title='Previous' color='black' />
                  Previous episode
                </a>
              </div>

              <div>
                <a href={`/episodes/${episode.number + 1}`} style={{ display: episode.mostRecent ? 'none' : 'flex' }}>
                  Next episode
                  <Icon path={mdiArrowRight} title='Previous' color='black' />
                </a>
              </div>
            </div>
          </div>

          {!!episode.description?.length && (
            <div className='section'>
              <h2>Description</h2>
              <p>{episode.description}</p>
            </div>
          )}

          {episode.guests.map((guest: any) => (
            <div key={guest.name} className='section'>
              <h2>{guest.name}</h2>
              <p>{guest.description}</p>

              {guest.links.map((link: any) => (
                <div key={link.url}>
                  <a href={link.url}>{link.label}</a>
                </div>
              ))}
            </div>
          ))}

          {episode.additionalSections.map((section: any) => (
            <div key={section.title} className='section'>
              <h2>{section.title}</h2>

              {section.links.map((link: any) => (
                <div key={link.url}>
                  <a href={link.url}>{link.label}</a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const episodes = await getApiData(`/episodes`);

  const paths = episodes.map((episode: { id: number }) => {
    return {
      params: {
        episodeId: episode.id.toString(),
      },
    };
  });

  return { paths, fallback: false };
};

export async function getStaticProps(context: any) {
  const episode = await getApiData(`/episodes/${context.params.episodeId}`, ['links', 'guests.links', 'additionalSections.links']);
  const episodeExtra = await getApiData(`/episode-extra`, ['extraSections.links']);
  const episodeCount = (await getApiData(`/episodes`)).length;

  if (episodeCount === episode.attributes.number) episode.attributes.mostRecent = true;

  return {
    props: { extraSections: episodeExtra.attributes.extraSections, ...episode.attributes },
  };
}
