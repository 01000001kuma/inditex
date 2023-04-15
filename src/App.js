import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import Episodes from './components/Episodes';
import Navbar from './components/Navbar';
import PodcastDetail from './components/PodcastDetail'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/podcast">
            <Route path=":id" element={<PodcastDetail />} />
            {/* <Route path="/episode" element={<Episodes />} />
            <Route path="/episode/:id" element={<Episodes />} /> */}
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;