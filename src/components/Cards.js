import React, { useState, useEffect } from 'react';

function Cards() {
  const STORAGE_KEY = 'podcastList';
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedPodcasts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const lastFetchDate = localStorage.getItem('lastFetchDate');

    if (storedPodcasts && lastFetchDate) {
      const currentDate = new Date().getTime();
      if (currentDate - lastFetchDate < ONE_DAY_MS) {
        setPodcasts(storedPodcasts.entry);
        setFilteredPodcasts(storedPodcasts.entry);
        return;
      }
    }

    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      .then((response) => response.json())
      .then((data) => {
        const feed = data.feed;
        setPodcasts(feed.entry);
        setFilteredPodcasts(feed.entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(feed));
        localStorage.setItem('lastFetchDate', new Date().getTime());
      })
      .catch((error) => {
        console.error('Error fetching podcasts:', error);
      });
  }, []);

  useEffect(() => {
    const filtered = podcasts.filter((podcast) => {
      const title = podcast['im:name'].label.toLowerCase();
      const author = podcast['im:artist'].label.toLowerCase();
      const searchTermLower = searchTerm.toLowerCase();
      return title.includes(searchTermLower) || author.includes(searchTermLower);
    });
    setFilteredPodcasts(filtered);
  }, [podcasts, searchTerm]);

  return (
    <div className="contenedor">
      <div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar podcasts por título o autor"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="row">
          {filteredPodcasts.map((podcast) => (
            <div key={podcast.id.attributes['im:id']}>
              <div className="card">
                <img src={podcast['im:image'][2].label} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{podcast['im:name'].label}</h5>
                  <p className="card-text">Author: {podcast['im:artist'].label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;