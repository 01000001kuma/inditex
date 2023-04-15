import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function PodcastPlayer() {
  const { id } = useParams();
  const STORAGE_KEY = `podcastDetail-${id}`;

  const [podcast, setPodcast] = useState({});
  const [description, setDescription] = useState('');
  const [audioSrc, setAudioSrc] = useState('');

  useEffect(() => {
    const storedPodcast = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (storedPodcast) {
      setPodcast(storedPodcast.podcast);
      setDescription(storedPodcast.podcast.description);
      setAudioSrc(storedPodcast.episodes[0].enclosureUrl);
    } else {
      fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=1`)
        .then((response) => response.json())
        .then((data) => {
          const podcastData = data.results[0];
          const episodeData = data.results[0];
          setPodcast(podcastData);
          setDescription(podcastData.description);
          setAudioSrc(episodeData.enclosureUrl);
          localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify({ podcast: podcastData, episodes: [episodeData] })
          );
        })
        .catch((error) => {
          console.error('Error fetching podcast details:', error);
        });
    }
  }, [id]);

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

export default PodcastPlayer;