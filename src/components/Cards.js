import React from 'react'
import { useState, useEffect } from 'react';



function Cards() {
  
  const obtenerTodo = async( setPodcast ) => {
    const peticion = await fetch('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json')
    const {feed} = await peticion.json();
    setPodcast(feed);
  
  };
  
  const [podcast, setPodcast] = useState({});

  useEffect(() => {
      obtenerTodo(setPodcast);
  }, []);
  
  
  return (
      <div className="contenedor ">
        <div>
          <div className="row">
            {podcast.entry && podcast.entry.map((podcast) => (
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