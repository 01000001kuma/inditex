
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
    <div className="container">
    <div className="">
      <div className="col-md-3">
        <div className="sidebar">
          <div className="podcast-info">
            <a href={`/podcast/${podcast.collectionId}`}><img src={podcast.artworkUrl600} alt={podcast.collectionName} /></a>
            <h3>{podcast.collectionName}</h3>
            <h5>By: {podcast.artistName}</h5>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="podcast-details">
          <h2>{podcast.collectionName}</h2>
          <div dangerouslySetInnerHTML={{__html: podcast.description}} />
          {episode[0] && (
            <div key={episode[0].trackId}>
              <h3>{episode[0].trackName}</h3>
              <div dangerouslySetInnerHTML={{__html: episode[0].description}} />
              <ReactPlayer url={episode[0].enclosureUrl} controls={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Podcast;
