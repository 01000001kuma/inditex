
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Podcast() {
  const [podcast, setPodcast] = useState(null);
  const [episode, setEpisode] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20')}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        const { results } = JSON.parse(data.contents);
        setPodcast(results[0]);
        setEpisode(results.slice(1));
      })
      .catch(error => console.error('Error fetching podcast details:', error));
  }, []);

  if (!podcast) return <div>Error fetching data...</div>;

  return (
    <div className="container">
    <div className="row">
      <div className="col-md-3">
        <div className="sidebar">
          <div className="podcast-info">
            <a href={`/podcast/${podcast.collectionId}`}><img src={podcast.artworkUrl600} alt={podcast.collectionName} /></a>
            <h3><a href={`/podcast/${podcast.collectionId}`}>{podcast.collectionName}</a></h3>
            <h5>By: {podcast.artistName}</h5>
          </div>
        </div>
      </div>
      <div className="col-md-9">
        <div className="podcast-details">
          <h2>{podcast.collectionName}</h2>
          <div dangerouslySetInnerHTML={{__html: podcast.description}} />
          {episode[0] && (
            <div key={episode[0].trackId}>
              <h3><a href={`/podcast/${podcast.collectionId}/episode/${episode[0].trackId}`}>{episode[0].trackName}</a></h3>
              <div dangerouslySetInnerHTML={{__html: episode[0].description}} />
              <audio controls>
                <source src={episode[0].enclosureUrl} type={episode[0].enclosureType} />
              </audio>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
    

}

export default Podcast;








// this code shows only one episode but not the description

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function Podcast() {
//   const [podcast, setPodcast] = useState(null);
//   const [episode, setEpisode] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20')}`)
//       .then(response => {
//         if (response.ok) return response.json();
//         throw new Error('Network response was not ok.');
//       })
//       .then(data => {
//         const { results } = JSON.parse(data.contents);
//         setPodcast(results[0]);
//         setEpisode(results.slice(1));
//       })
//       .catch(error => console.error('Error fetching podcast details:', error));
//   }, []);

//   if (!podcast) return <div>Error fetching data...</div>;

//   return (
// <div className="container">
//     <div className="row">
//       <div className="col-md-3">
//         <div className="sidebar">
//           <div className="podcast-info">
//             <a href={`/podcast/${podcast.collectionId}`}><img src={podcast.artworkUrl600} alt={podcast.collectionName} /></a>
//             <h3><a href={`/podcast/${podcast.collectionId}`}>{podcast.collectionName}</a></h3>
//             <h5>By: {podcast.artistName}</h5>
//           </div>
//         </div>
//       </div>
//       <div className="col-md-9">
//         <div className="podcast-details">
//           <h2>{podcast.collectionName}</h2>
//           <div dangerouslySetInnerHTML={{__html: podcast.description}} />
//           <div key={episode.trackId}>
//             <h3><a href={`/podcast/${podcast.collectionId}/episode/${episode.trackId}`}>{episode.trackName}</a></h3>
//             <div dangerouslySetInnerHTML={{__html: episode.description}} />
//             <audio controls>
//               <source src={episode.enclosureUrl} type={episode.enclosureType} />
//             </audio>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
//   );
// }

// export default Podcast;











// this code renders all the episodes of a podcast

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// function Podcast() {
//   const [podcast, setPodcast] = useState(null);
//   const [episodes, setEpisodes] = useState([]);
//   const { id } = useParams();

//   useEffect(() => {
//     fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/lookup?id=934552872&media=podcast&entity=podcastEpisode&limit=20')}`)
//       .then(response => {
//         if (response.ok) return response.json();
//         throw new Error('Network response was not ok.');
//       })
//       .then(data => {
//         const { results } = JSON.parse(data.contents);
//         setPodcast(results[0]);
//         setEpisodes(results.slice(1));
//       })
//       .catch(error => console.error('Error fetching podcast details:', error));
//   }, []);

//   if (!podcast) return <div>Error fetching data...</div>;

  // return (
  //   <div className="container">
  //     <div className="row">
  //       <div className="col-md-3">
  //         <div className="sidebar">
  //           <div className="podcast-info">
  //             <a href={`/podcast/${podcast.collectionId}`}><img src={podcast.artworkUrl600} alt={podcast.collectionName} /></a>
  //             <h3><a href={`/podcast/${podcast.collectionId}`}>{podcast.collectionName}</a></h3>
  //             <h5>By: {podcast.artistName}</h5>
  //           </div>
  //         </div>
  //       </div>
  //       <div className="col-md-9">
  //         <div className="podcast-details">
  //           <h2>{podcast.collectionName}</h2>
  //           <div dangerouslySetInnerHTML={{__html: podcast.description}} />
  //           {episodes.map(episode => (
  //             <div key={episode.trackId}>
  //               <h3><a href={`/podcast/${podcast.collectionId}/episode/${episode.trackId}`}>{episode.trackName}</a></h3>
  //               <div dangerouslySetInnerHTML={{__html: episode.description}} />
  //               <audio controls>
  //                 <source src={episode.enclosureUrl} type={episode.enclosureType} />
  //               </audio>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
// }

// export default Podcast;
