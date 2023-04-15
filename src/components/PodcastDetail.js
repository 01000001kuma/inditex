import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Episodes from './Episodes';

const STORAGE_KEY = 'podcastDetail';

const PodcastDetail = ({ match }) => {
  const [podcast, setPodcast] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const storedPodcast = JSON.parse(localStorage.getItem(STORAGE_KEY));

    if (!match || (storedPodcast && storedPodcast.id.attributes['im:id'] === match.params.id)) {
      setPodcast(storedPodcast);
      setEpisodes(storedPodcast.entry);
      return;
    }

    const fetchPodcast = async () => {
      const response = await fetch(`https://itunes.apple.com/lookup?id=${match.params.id}&entity=podcastEpisode`);
      const { results } = await response.json();

      const podcastData = {
        id: results[0].collectionId,
        ...results[0].feed,
      };

      setPodcast(podcastData);
      setEpisodes(podcastData.entry);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(podcastData));
    };

    fetchPodcast();
  }, [match]);

  if (!podcast) {
    return <p>Loading...</p>;
  }

  return (
    <div className="podcast-detail">
      <Sidebar podcast={podcast} />
      <Episodes episodes={episodes} />
    </div>
  );
};

export default PodcastDetail;