import React, { useState } from 'react';
import {useHistory, Link } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const history = useHistory();
  const updateSearchQuery = (e) => {
    setSearchQuery(e.target.value); 
  }

  const onSearch = async (e) => {
    e.preventDefault();
    history.push({
      pathname: '/search',
      search: `query=${searchQuery}`
    });
  }

  return (
    <header className="header">
      <Link to="/"><img src="https://fontmeme.com/permalink/190707/fd4735271a0d997cbe19a04408c896fc.png" alt="netflix-font" border="0" /></Link>
      <div id="navigation" className="navigation">
        <nav>
          <ul>
            <li><Link to="/my-watch-list">Watch List</Link></li>
          </ul>
        </nav>
      </div>
      <form id="search" className="search" onSubmit={onSearch}>
        <input type="search" placeholder="Search for a title..." value={searchQuery} onChange={updateSearchQuery} />
        <div className="searchResults"></div>
      </form>
    </header>
  )
}

export default Header