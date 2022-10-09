import type { GetStaticPaths, NextPage } from 'next';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
import Icon from '@mdi/react';
import axios from 'axios';

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
  guests: any;
  additionalResources: any;
};

export default function Episode(episode: EpisodeProps) {
  console.log('EPISODE', episode);
  return (
    <div id='episode'>
      <div id='episode-body'>
        <h1>
          Episode #{episode.number}: {episode.title}
        </h1>

        <div>
          <iframe className='video' title='Youtube player' sandbox='allow-same-origin allow-forms allow-popups allow-scripts allow-presentation' src={`https://youtube.com/embed/${episode.youtubeVideoId}?autoplay=0`}></iframe>

          <div>
            <span>Listen on </span>
            <a href={episode.links.youtube}>Youtube</a>
            <span> | </span>
            <a href={episode.links.spotify}>Spotify</a>
          </div>
        </div>

        {!!episode.description?.length && (
          <div>
            <h2>Description</h2>
            <p>{episode.description}</p>
          </div>
        )}

        {episode.guests.map((guest: any) => (
          <div key={guest.name.replace(' ', '').toUpperCase()}>
            <h2>{guest.name}</h2>
            <p>{guest.description}</p>

            {guest.links.map((link: any) => (
              <div key={link.href}>
                <a href={link.href}>{link.label}</a>
              </div>
            ))}
          </div>
        ))}

        {!!episode.additionalResources?.length && (
          <div>
            <h2>Additional Resources</h2>

            {episode.additionalResources.map((link: any) => (
              <div key={link.href}>
                <a href={link.href}>{link.label}</a>
              </div>
            ))}
          </div>
        )}

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
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(`${process.env.API_ROOT}/episodes`, {
    headers: {
      Authorization: `bearer ${process.env.API_KEY}`,
    },
  });

  const paths = res.data.data.map((episode: { id: number }) => {
    return {
      params: {
        episodeId: episode.id.toString(),
      },
    };
  });

  return { paths, fallback: false };
};

export async function getStaticProps(context: any) {
  const res = await axios.get(`${process.env.API_ROOT}/episodes/${context.params.episodeId}`, {
    headers: {
      Authorization: `bearer ${process.env.API_KEY}`,
    },
    params: {
      populate: ['links', 'guests', 'guests.links'].toString(),
    },
  });

  return {
    props: res.data.data.attributes,
  };
}
