import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Episode from './Episode';

function PodcastDetail() {
  const { id } = useParams();
  const STORAGE_KEY = `podcastDetail-${id}`;
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const storedPodcast = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const lastFetchDate = localStorage.getItem('lastFetchDate');

    if (storedPodcast && lastFetchDate) {
      const currentDate = new Date().getTime();
      if (currentDate - lastFetchDate < ONE_DAY_MS) {
        setPodcast(storedPodcast.podcast);
        setEpisodes(storedPodcast.episodes);
        return;
      }
    }

    fetch(`https://itunes.apple.com/lookup?id=${id}&media=podcast&entity=podcastEpisode&limit=20`)
      .then((response) => response.json())
      .then((data) => {
        const podcastData = data.results[0];
        const episodesData = data.results.slice(1);
        setPodcast(podcastData);
        setEpisodes(episodesData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ podcast: podcastData, episodes: episodesData }));
        localStorage.setItem('lastFetchDate', new Date().getTime());
      })
      .catch((error) => {
        console.error('Error fetching podcast details:', error);
      });
  }, [id]);

  return (
<div className="container">
      <div className="row">
        <div className="podcastArtist">
          <img src={podcast.artworkUrl600} alt={podcast.collectionName} />
          <h3>{podcast.collectionName}</h3>
          <h5>By: {podcast.artistName}</h5>
          <p>{podcast.artistName}</p>
        </div>
        <div className="episodes">
          <h2>{episodes.length} episodes</h2>
          <ul className="list-group">
            {episodes.map((episode) => (
              <li className="list-group-item" key={episode.trackId}>
                <Link to={`/podcast/${id}/episode/${episode.trackId}`}>{episode.trackName}</Link>

              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PodcastDetail;