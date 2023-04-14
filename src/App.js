import React from 'react';
import { useState, useEffect } from 'react';
import { obtenerTodo } from './funciones';



function App() {

  const [podcast, setPodcast] = useState([]);

  useEffect(() => {
    obtenerTodo(setPodcast);
  }, []);


  return (
    <div className="App">
      <h1>Hello</h1>
    </div>
  );
}

export default App;
