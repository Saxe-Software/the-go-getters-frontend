import type { GetStaticPaths, NextPage } from 'next';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import { getApiData } from '../../helpers/api';
import Head from 'next/head';
import { Link } from '@mui/material';
import PageSection from '../../components/PageSection';

type EpisodeProps = {
  id: number;
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
  defaultSections: Array<any>;
};

export default function Episode(episode: EpisodeProps) {
  return (
    <>
      <Head>
        <title>
          Ep. #{episode.id} - {episode.title} | The Go Getters
        </title>
      </Head>

      <PageSection>
        <div id='episode'>
          <div id='episode-body'>
            <h1>
              Episode #{episode.id}: {episode.title}
            </h1>

            <div>
              <div>
                <span>Listen on </span>
                <Link href={episode.links.youtube}>Youtube</Link>
                <span> | </span>
                <Link href={episode.links.spotify}>Spotify</Link>
              </div>

              <iframe className='video' title='Youtube player' sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' src={`https://youtube.com/embed/${episode.youtubeVideoId}?autoplay=0`}></iframe>

              <div id='other-episodes'>
                <div>
                  <Link href={`/episodes/${episode.id - 1}`} style={{ display: episode.id === 1 ? 'none' : 'flex' }}>
                    <Icon path={mdiArrowLeft} title='Previous' color='black' />
                    Previous episode
                  </Link>
                </div>

                <div>
                  <Link href={`/episodes/${episode.id + 1}`} style={{ display: episode.mostRecent ? 'none' : 'flex' }}>
                    Next episode
                    <Icon path={mdiArrowRight} title='Previous' color='black' />
                  </Link>
                </div>
              </div>
            </div>

            {episode.description?.length && (
              <div className='section'>
                <h2>Description</h2>
                <p>{episode.description}</p>
              </div>
            )}

            {episode.guests.map((guest: any) => (
              <div key={guest.id} className='section'>
                <h2>{guest.name}</h2>
                <p>{guest.description}</p>

                {guest.links.map((link: any) => (
                  <div key={link.url}>
                    <Link href={link.url}>{link.label}</Link>
                  </div>
                ))}
              </div>
            ))}

            {[...episode.additionalSections, ...episode.defaultSections].map((section: any) => (
              <div key={section.id} className='section'>
                <h2>{section.title}</h2>
                <p>{section.text}</p>

                {section.links.map((link: any) => (
                  <div key={link.url}>
                    <Link href={link.url}>{link.label}</Link>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </PageSection>
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
  const defaultSections = await getApiData(`/default-section`, ['sections.links']);
  const episodeCount = (await getApiData(`/episodes`)).length;

  if (episodeCount === episode.id) episode.attributes.mostRecent = true;

  return {
    props: { id: episode.id, defaultSections: defaultSections.attributes.sections, ...episode.attributes },
  };
}
