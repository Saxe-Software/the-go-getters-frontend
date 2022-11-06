import Head from 'next/head';
import Episode from '../../components/Episode';
import PageSection from '../../components/PageSection';
import { getApiData } from '../../helpers/api';
import { TextField, Button, Alert, Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { caseInsensitiveIncludes } from '../../helpers';

type EpisodesProps = {
  episodes: Array<any>;
};

export default function Episodes({ episodes }: EpisodesProps) {
  const [filteredAndSortedEpisodes, setFilteredAndSortedEpisodes] = useState<Array<any>>([...episodes].reverse());
  const [searchInputVal, setSearchInputVal] = useState<string>('');
  const [searchVal, setSearchVal] = useState<string>('');
  const [sort, setSort] = useState<string>('newest');

  useEffect(() => {
    let filtered;

    filtered = !searchVal
      ? [...episodes]
      : [...episodes].filter(episode => {
          return caseInsensitiveIncludes(episode.attributes.title, searchVal);
        });

    setFilteredAndSortedEpisodes(sort === 'newest' ? [...filtered].reverse() : filtered);
  }, [episodes, searchVal, sort]);

  return (
    <>
      <Head>
        <title>Episodes | The Go Getters</title>
      </Head>

      <PageSection title='All Episodes'>
        <div id='filters'>
          <div id='search'>
            <TextField size='small' value={searchInputVal} onChange={e => setSearchInputVal(e.target.value)} />

            <div>
              <Button variant='contained' disableElevation onClick={() => setSearchVal(searchInputVal)}>
                Filter
              </Button>
              <Button
                variant='outlined'
                disableElevation
                onClick={() => {
                  setSearchInputVal('');
                  setSearchVal('');
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
              }}
              size='small'
            >
              <MenuItem value={'newest'}>Newest</MenuItem>
              <MenuItem value={'oldest'}>Oldest</MenuItem>
            </Select>
          </div>
        </div>

        {!filteredAndSortedEpisodes.length && (
          <Alert sx={{ margin: '1em' }} variant='outlined' severity='info'>
            Sorry, no episodes match your search
          </Alert>
        )}

        <div id='episodes' className='episodeList'>
          {filteredAndSortedEpisodes.map((episode: any) => (
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
