import React from 'react';
import { useState, useEffect } from 'react';
import { obtenerTodo } from './funciones';



function App() {

  const [podcast, setPodcast] = useState({});

  useEffect(() => {
    obtenerTodo(setPodcast);
  }, []);


  return (
    <div className="contenedor ">
      <div>
        <h1>Podcast</h1>
        <div className="row">
          {podcast.entry && podcast.entry.map((podcast) => (
            <div className="col-4" key={podcast.id.attributes['im:id']}>
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

export default App;
