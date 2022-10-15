type EpisodeProps = {
  number: number
  title?: string;
  youtubeVideoId: string;
};

export default function PageSection({ number, title, youtubeVideoId }: EpisodeProps) {
  return (
    <div className='episodeWrapper'>
      <a href={`/episodes/${number}`}>
        <img src={`https://img.youtube.com/vi/${youtubeVideoId}/maxresdefault.jpg`} alt='Episode thumbnail' />
        {title && (
          <p>
            <b>
              {title.slice(0, 80)}
              {title.length > 50 ? '...' : ''}
            </b>
          </p>
        )}
      </a>
    </div>
  );
}
