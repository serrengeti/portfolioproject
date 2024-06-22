// Playlist.js
import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

function Playlist({ playlist, removeFromPlaylist, savePlaylist, playlistName, handleNameChange }) {

  return (
    <div className="Playlist">
      <input
        type="text"
        value={playlistName}
        onChange={handleNameChange} // Use handleNameChange to update playlistName
        placeholder="Playlist Name"
      />
      <TrackList playlist={playlist} action="-" addOrRemove={removeFromPlaylist} />
      <div className="container">
        <button id="button" onClick={savePlaylist}>SAVE TO SPOTIFY</button>
      </div>
    </div>
  );

}

export default Playlist;
