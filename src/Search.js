import React, { useState, useEffect } from 'react';
import Show from "./Show";
import { useLocation } from 'react-router-dom';


const Search = (props) => {  
  const [shows, addShows] = useState([]);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const query = urlSearch.get('query');

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/search/tv?query=${query}&watch_region=CA&api_key=0b941991fb739be72fed42ae5e2a4891`);
      const movie = await response.json();
      addShows(movie.results);
    }

    fetchData();
  }, [query]);

  return (
    <div className="titleList">
      <div className="title">
        <h1>Results</h1>
        <div className="titles-wrapper">
          {
            shows && shows.map(show => (
              <Show show={show} key={show.id} onWatchList={props.onWatchList} watchList={props.watchList}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Search