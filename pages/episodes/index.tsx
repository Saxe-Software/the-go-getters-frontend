import Head from 'next/head';
import Episode from '../../components/Episode';
import PageSection from '../../components/PageSection';
import { getApiData } from '../../helpers/api';
import { CircularProgress, Container, TextField, Button, Alert, Select, MenuItem } from '@mui/material';
import { useState } from 'react';

type EpisodesProps = {
  episodes: Array<any>;
};

export default function Episodes({ episodes }: EpisodesProps) {
  const [filterPhrase, setFilterPhrase] = useState<string>('');
  const [filteredEpisodes, setFilteredEpisodes] = useState<Array<any>>(episodes.reverse());
  const [sort, setSort] = useState<string>('newest');

  const stripped = (str: string) => {
    [',', '"', "'", '.', '!', '?', ' '].forEach(char => str.replace(char, ''));

    return str.toUpperCase();
  };

  const filterEpisodes = () => {
    if (!filterPhrase) setFilteredEpisodes(episodes);

    setFilteredEpisodes(
      episodes.filter(episode => {
        return stripped(episode.attributes.title).includes(stripped(filterPhrase));
      })
    );
  };

  return (
    <>
      <Head>
        <title>Episodes | The Go Getters</title>
      </Head>

      <PageSection title='All Episodes'>
        <div id='filters'>
          <div id='search'>
            <TextField size='small' value={filterPhrase} onChange={e => setFilterPhrase(e.target.value)} />

            <div>
              <Button variant='contained' disableElevation onClick={() => filterEpisodes()}>
                Filter
              </Button>
              <Button
                variant='outlined'
                disableElevation
                onClick={() => {
                  setFilterPhrase('');
                  setFilteredEpisodes(episodes);
                }}
              >
                Clear
              </Button>
            </div>
          </div>

          <div id='sort'>
            <Select
              value={sort}
              onChange={e => {
                setSort(e.target.value);
                setFilteredEpisodes(filteredEpisodes.reverse());
              }}
              size='small'
            >
              <MenuItem value={'newest'}>Newest</MenuItem>
              <MenuItem value={'oldest'}>Oldest</MenuItem>
            </Select>
          </div>
        </div>

        {!filteredEpisodes.length && (
          <Alert sx={{ margin: '1em' }} variant='outlined' severity='info'>
            Sorry, no episodes match your search
          </Alert>
        )}

        <div id='episodes' className='episodeList'>
          {filteredEpisodes.map((episode: any) => (
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
