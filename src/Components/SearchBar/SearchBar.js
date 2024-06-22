import React from 'react';
import './SearchBar.css';

function SearchBar({searchedItem, handleChange}) {
  return (
    <div className="SearchBar">
      <input type="text" placeholder="Search for a song, artist, or album" value={searchedItem} onChange={handleChange}/>
      <button>SEARCH</button>
    </div>
  );
}

export default SearchBar;
