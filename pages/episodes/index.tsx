import Head from 'next/head';
import Episode from '../../components/Episode';
import PageSection from '../../components/PageSection';
import { TextField, Button, Alert, Select, MenuItem } from '@mui/material';
import { KeyboardEvent, useEffect, useState } from 'react';
import { caseInsensitiveIncludes } from '../../helpers';
import youtubeVideos from '../../data/youtube-videos.json';
import YoutubeVideo from '../../types/YoutubeVideo';

type EpisodesProps = {
  episodes: Array<YoutubeVideo>;
};

export default function Episodes({ episodes }: EpisodesProps) {
  const [filteredAndSortedEpisodes, setFilteredAndSortedEpisodes] = useState<Array<YoutubeVideo>>(
    [...episodes].reverse()
  );
  const [searchInputVal, setSearchInputVal] = useState<string>('');
  const [searchVal, setSearchVal] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<string>('newest');

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchVal(searchInputVal);
    }
  };

  useEffect(() => {
    let allEpisodes = [...episodes];
    let filtered;

    if (!searchVal) filtered = allEpisodes;
    else
      filtered = allEpisodes.filter(episode => {
        return caseInsensitiveIncludes(episode.snippet.title, searchVal);
      });

    setFilteredAndSortedEpisodes(sortDirection === 'newest' ? filtered : [...filtered].reverse());
  }, [episodes, searchVal, sortDirection]);

  return (
    <>
      <Head>
        <title>Episodes | The Go Getters</title>
      </Head>

      <PageSection title='All Episodes'>
        <div id='filters'>
          <div id='search'>
            <TextField
              size='small'
              value={searchInputVal}
              onChange={e => setSearchInputVal(e.target.value)}
              onKeyUp={handleKeyPress}
            />

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
                }}>
                Clear
              </Button>
            </div>
          </div>

          <div id='sort'>
            <Select
              value={sortDirection}
              onChange={e => {
                setSortDirection(e.target.value);
              }}
              size='small'>
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
          {filteredAndSortedEpisodes.map((episode: YoutubeVideo) => (
            <div key={episode.id} className='episodeWrapper'>
              <Episode
                id={episode.id}
                title={episode.snippet.title}
                youtubeVideoId={episode.snippet.resourceId.videoId}
              />
            </div>
          ))}
        </div>
      </PageSection>
    </>
  );
}

export async function getStaticProps(context: any) {
  return {
    props: { episodes: youtubeVideos.filter(episode => Object.keys(episode.snippet.thumbnails).length > 0) },
  };
}
