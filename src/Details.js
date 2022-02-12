import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
  
const Details = (props) => {
  const [show, addShow] = useState({});
  const { id } = useParams();
  let watchButton = <button className="add-to-watchlist" onClick={(e) => {onWatchList(show)}}>+ Add to watch list</button>;
  useEffect(() => {
    const getShow = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=660d33f90ac6e4f8afd9083041f17009`);
      const show = await response.json();
      addShow(show);
    }

    getShow();
  },[id]);

  let findShow = props.watchList.find(show => show.id === parseInt(id));
  if (findShow !== undefined) {
    watchButton = <button className="remove-to-watchlist" onClick={(e) => {onWatchList(show)}}>- Remove from watch list</button>;
  }
  
  const onWatchList = (show) => {
    props.onWatchList(show);
  }
  
  return (
    <div className="show-details">
      <img src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`} alt="" />
      <div className="show-details-inner">
        <h1>{show.original_name}</h1>
        <div className="description">
          {show.overview}
        </div>
        {watchButton}
      </div>
    </div>
  )
}

export default Details