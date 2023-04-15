import React from 'react';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import PodcastDetail from './components/PodcastDetail'; 



function App() {
  return (
    <div className="App">
      <Navbar />
      <Cards />
      <PodcastDetail />
      
    </div>
  );


}

export default App;
