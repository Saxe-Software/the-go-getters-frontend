import Head from 'next/head';
import Episode from '../../components/Episode';
import PageSection from '../../components/PageSection';
import { TextField, Button, Alert, Select, MenuItem } from '@mui/material';
import { KeyboardEvent, useEffect, useState } from 'react';
import { caseInsensitiveIncludes } from '../../helpers';
import youtubeVideos from '../../netlify/functions/tmp/youtube-videos.json';
import YoutubeVideo from '../../types/YoutubeVideo';

type EpisodesProps = {
    episodes: Array<YoutubeVideo>;
};

export default function Episodes({ episodes }: EpisodesProps) {
    const [filteredAndSortedEpisodes, setFilteredAndSortedEpisodes] = useState<Array<YoutubeVideo>>([...episodes].reverse());
    const [searchInputVal, setSearchInputVal] = useState<string>('');
    const [searchVal, setSearchVal] = useState<string>('');
    const [sort, setSort] = useState<string>('newest');

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
                        <TextField size='small' value={searchInputVal} onChange={e => setSearchInputVal(e.target.value)} onKeyUp={handleKeyPress} />

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
                    {filteredAndSortedEpisodes.map((episode: YoutubeVideo) => (
                        <div key={episode.id} className='episodeWrapper'>
                            <Episode number={episode.episodeNumber} title={`Ep. ${episode.snippet.title}`} youtubeVideoId={episode.snippet.resourceId.videoId} />
                        </div>
                    ))}
                </div>
            </PageSection>
        </>
    );
}

export async function getStaticProps(context: any) {
    return {
        props: { episodes: youtubeVideos.sort((a: any, b: any) => (a.episodeNumber > b.episodeNumber ? 1 : -1)).filter(episode => !!episode.episodeNumber) },
    };
}
