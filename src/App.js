import React, { useState, useEffect} from 'react';
import { Switch, Route } from "react-router-dom";
import Details from './Details';
import './App.css';
import Header from './Header';
import Show from './Show';
import Search from './Search';
import WatchList from './Watch-list';

const App = () => {
  const [showsHolder, addShows] = useState([]);
  const [watchList, addWatchList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let movies = await Promise.all([{name: "Netflix", id:8}, {name: "Crave", id:230}, {name: "Disney", id:337}, {name:"Apple Plus", id:350}].map(async (provider) => {
        const movie = await fetch(`https://api.themoviedb.org/3/discover/tv?&sort_by=popularity.desc&with_watch_providers=${provider.id}&watch_region=CA&api_key=660d33f90ac6e4f8afd9083041f17009`);
        const movieResponse = await movie.json();
        return {name: provider.name, shows: movieResponse.results, id: provider.id};
      }));
      
      addShows(movies);
    }

    const watchList = localStorage.getItem('watchList');
    addWatchList(JSON.parse(watchList) || []);
    fetchData();
  }, []);
  
  const onWatchList = (show) => {
    addWatchList(currentState => {
      const filterWatchList = currentState.find(element => element.id === show.id);
      if (filterWatchList === undefined) {
        const watchList = [...currentState, {...show, alreadyOnWatchList: true}];
        localStorage.setItem('watchList', JSON.stringify(watchList));
        return watchList;
      } else {
        const watchList = currentState.filter(element => element.id !== show.id);
        localStorage.setItem('watchList', JSON.stringify(watchList));
        return watchList;
      }
    });
  }

  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          {
            showsHolder.map(provider => {
              return (
                <div className="titleList" key={provider.id}>
                  <div className="title">
                    <h1>{provider.name}</h1>
                    <div className="titles-wrapper">
                      {
                        provider.shows.map(show => {
                          return (
                            <Show key={show.id} show={show} onWatchList={onWatchList} watchList={watchList}/>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </Route>
        <Route exact path="/details/:id">
          <Details shows={showsHolder} onWatchList={onWatchList} watchList={watchList}/>
        </Route>
        <Route exact path="/search">
          <Search onWatchList={onWatchList} watchList={watchList}/>
        </Route>
        <Route exact path="/my-watch-list">
          <WatchList onWatchList={onWatchList} watchList={watchList}/>
        </Route>  
      </Switch>
    </>
  )
}

export default App