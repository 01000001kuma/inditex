
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';

function Podcast() {
  const [podcast, setPodcast] = useState(null);
  const [episode, setEpisode] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20')}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        const { results } = JSON.parse(data.contents);
        setPodcast(results[0]);
        setEpisode(results.slice(1));
      })
      .catch(error => console.error('Error fetching podcast details:', error));
  }, []);

  if (!podcast) return <div>Error fetching data...</div>;

  return (
    <div className="container2">

        <div className="podcastArtist">          
            <a href={`/podcast/${podcast.collectionId}`}><img className='artist' src={podcast.artworkUrl600} alt={podcast.collectionName} /></a>
            <h3 className='podcastName'>{podcast.collectionName}</h3>
            <h5 className='podcastName'>By: {podcast.artistName}</h5>
        </div>


        <div className="podcast-details">
          <div  dangerouslySetInnerHTML={{__html: podcast.description}} />
          {episode[0] && (
            <div key={episode[0].trackId}>
              <h3 className='podcastEpi' >{episode[0].trackName}</h3>
              <div className='description' dangerouslySetInnerHTML={{__html: episode[0].description}} />
              <ReactPlayer url={episode[0].enclosureUrl} controls={true} />
            </div>
          )}
        </div>

  </div>
  );
}

export default Podcast;
