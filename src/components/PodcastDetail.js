import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


function PodcastDetail() {
  const { id } = useParams();
  const STORAGE_KEY = `podcastDetail-${id}`;
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const [podcast, setPodcast] = useState({});
  const [episodes, setEpisodes] = useState([]);
  const [episodeIndex, setEpisodeIndex] = useState(0);


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


  console.log('podcast', podcast)

  // mirando la data que el fetch me retorna porque la descripcion/summary del podcast no aparece en la consola 

  const episodeDescription = episodes[episodeIndex]?.summary;

  return (
    <div className="container2">

      <div className="podcastArtist">
        <img className='artist' src={podcast.artworkUrl600} alt={podcast.collectionName} />
        <h3 className='podcastName'>{podcast.collectionName}</h3>
        <h5 className='podcastName'>By: {podcast.artistName}</h5>
        <div className='description' dangerouslySetInnerHTML={{ __html: episodeDescription || '' }} />
      </div>
    <div className="episodes">
    <h2 className='epi' >Episodes: {episodes.length}</h2>
      <table className="table">
        <thead>
          <tr>
            <th className='title'>Title</th>
            <th className='date'>Date</th>
            <th className='duration'>Duration</th>
          </tr>
        </thead>
        <tbody>
          {episodes.map((episode) => (
            <tr className='episode' key={episode.trackId}>
              <td className='tableTitleCell'>
                <Link className='podcastTitle' to={`/podcast/${id}/episode/${episode.trackId}`}>{episode.trackName}</Link>
              </td>
              <td className='tableDate'>
                <p>{new Date(episode.releaseDate).toLocaleDateString()}</p>
              </td>
              <td className='tableDuration'>
                <span>
                  {Math.floor(episode.trackTimeMillis / 1000 / 60)}:
                  {(episode.trackTimeMillis / 1000 % 60)
                    .toFixed(0)
                    .padStart(2, "0")}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
}

export default PodcastDetail;