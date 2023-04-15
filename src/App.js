import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import Navbar from './components/Navbar';
import PodcastDetail from './components/PodcastDetail'; 
import Episode from './components/Episode';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/podcast">
            <Route path=":id" element={<PodcastDetail />} />
            <Route path="podcast/:id/episode/:id" element={<Episode />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;