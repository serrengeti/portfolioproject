import React, { useState } from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

function SearchResults({searchResultsE, addToPlaylist}) {


  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList playlist={searchResultsE} action="+" addOrRemove={addToPlaylist}/>
    </div>
  );
}

export default SearchResults;
