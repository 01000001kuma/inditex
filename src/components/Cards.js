import React from 'react'
import { useState, useEffect } from 'react';



function Cards() {
  const STORAGE_KEY = 'podcastList';
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const obtenerTodo = async(setPodcast) => {
    const peticion = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    const { feed } = await peticion.json();
    setPodcast(feed);

    // Guardar los datos en localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(feed));
    localStorage.setItem('lastFetchDate', new Date().getTime());
  };

  const [podcast, setPodcast] = useState({});
  const [filtro, setFiltro] = useState('');

  useEffect(() => {
    const storedPodcasts = JSON.parse(localStorage.getItem(STORAGE_KEY));
    const lastFetchDate = localStorage.getItem('lastFetchDate');

    // Comprobar si ha pasado más de un día desde la última vez que se solicitó
    if (storedPodcasts && lastFetchDate) {
      const currentDate = new Date().getTime();
      if (currentDate - lastFetchDate < ONE_DAY_MS) {
        setPodcast(storedPodcasts);
        return;
      }
    }

    obtenerTodo(setPodcast);
  }, [ONE_DAY_MS]);

  useEffect(() => {
    const filtroMinusculas = filtro.toLowerCase();

    if (filtroMinusculas.trim() === '') {
      // Si no hay filtro, mostrar todos los podcasts
      setPodcast(JSON.parse(localStorage.getItem(STORAGE_KEY)));
      return;
    }

    const podcastsFiltrados = podcast.entry.filter((podcast) => {
      const tituloMinusculas = podcast['im:name'].label.toLowerCase();
      const autorMinusculas = podcast['im:artist'].label.toLowerCase();
      return tituloMinusculas.includes(filtroMinusculas) || autorMinusculas.includes(filtroMinusculas);
    });

    setPodcast({
      ...podcast,
      entry: podcastsFiltrados,
    });
  }, [filtro, podcast]);

  return (
    <div className="contenedor">
      <div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar podcasts por título o autor"
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="row">
          {podcast.entry &&
            podcast.entry.map((podcast) => (
              <div key={podcast.id.attributes['im:id']}>
                <div className="card">
                  <img src={podcast['im:image'][2].label} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{podcast['im:name'].label}</h5>
                    <p className="card-text">{podcast['im:artist'].label}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Cards