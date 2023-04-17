import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Episode() {
  const { id, episodeId } = useParams();
  const STORAGE_KEY = `podcastDetail-${id}-${episodeId}`;

  const [podcast, setPodcast] = useState({});
  const [description, setDescription] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    console.log('Fetching podcast details...');
    const storedPodcast = JSON.parse(localStorage.getItem(STORAGE_KEY));
  
    if (storedPodcast) {
      setPodcast(storedPodcast.podcast);
      setDescription(storedPodcast.podcast?.description || '');
      const episode = storedPodcast.episodes?.find((ep) => ep.guid === episodeId);
      setAudioSrc(episode.enclosureUrl);
    } else {
      fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20')}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Podcast details fetched successfully:', data);
          const podcastData = data.results[0]?.podcast;
          const episodeData = data.results[0]?.episodes?.find((ep) => ep.guid === episodeId);
          setPodcast(podcastData);
          setDescription(podcastData?.description || '');
          setAudioSrc(episodeData?.enclosureUrl || '');
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ podcast: podcastData, episodes: [episodeData] })
          );
        })
        .catch((error) => {
          console.error('Error fetching podcast details:', error);
        });
    }
  }, [id, episodeId]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-3">
          <div className="podcastArtist">
            <Link to={`/podcast/${id}`}>
              <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
            </Link>
            <h3>
              <Link to={`/podcast/${id}`}>{podcast.collectionName}</Link>
            </h3>
            <h5>By: {podcast.artistName}</h5>
          </div>
        </div>
        <div className="col-9">
          <h1>{podcast.collectionName}</h1>
          <div dangerouslySetInnerHTML={{ __html: description }}></div>
          <audio controls>
            <source src={audioSrc} type="audio/mpeg" />
          </audio>
        </div>
      </div>
    </div>
  );
}

export default Episode;

