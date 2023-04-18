import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style.css'
import Loading from './Loading';

function Cards() {
  const STORAGE_KEY = 'podcastList';
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

    setIsLoading(true);

    fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
      .then((response) => response.json())
      .then((data) => {
        const feed = data.feed;
        setPodcasts(feed.entry);
        setFilteredPodcasts(feed.entry);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(feed));
        localStorage.setItem('lastFetchDate', new Date().getTime());
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching podcasts:', error);
        setIsLoading(false);
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
      
        <div className="search">
          <Loading />
          <input
            type="text"
            className="bar"
            placeholder="Buscar podcasts"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="pocasts-grid">
          {filteredPodcasts.map((podcast) => (
            <div className="card" key={podcast.id.attributes['im:id']}>
              
              <Link className="card-link" to={`/podcast/${podcast.id.attributes['im:id']}`}>
                
                  
                  <img className='cardi' src={podcast['im:image'][2].label} alt="..." />
                  <h5>{podcast['im:name'].label}</h5>
                  <p>Author: {podcast['im:artist'].label}</p>
                
                
              </Link>

            </div>
          ))}
        </div>
      
    </div>
  );
}

export default Cards;