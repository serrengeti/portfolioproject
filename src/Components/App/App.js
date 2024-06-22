// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthButton from '../authbutton/AuthButton';
import CallbackPage from '../CallbackPage/callback';
import config from '../../config';

function App() {
  const [searchedItem, setSearchedItem] = useState('');
  const [searchResultsE, setSearchResultsE] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('spotify_access_token'));
  const [playlistName, setPlaylistName] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('spotify_access_token');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchedItem(value);

    if (value === '') {
      setSearchResultsE([]); // Clear search results if input is empty
    } else if (accessToken) {
      searchSpotify(value);
    } else {
      console.error('Access token is not available.');
    }
  };

  const searchSpotify = async (query) => {
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
    try {
      const response = await fetch(searchUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const data = await response.json();
      const tracks = data.tracks.items.map((item) => ({
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        album: item.album.name,
        uri: item.uri
      }));
      setSearchResultsE(tracks);
    } catch (error) {
      console.error('Error fetching Spotify data:', error);
    }
  };

  const addToPlaylist = (song) => {
    if (!playlist.find((item) => item.id === song.id)) {
      setPlaylist([...playlist, song]);
    }
  };

  const removeFromPlaylist = (songId) => {
    setPlaylist(playlist.filter((song) => song.id !== songId));
  };

  const savePlaylist = async () => {
    if (!playlistName || playlist.length === 0) {
      alert('Please enter a playlist name and add at least one song.');
      return;
    }

    try {
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      const userData = await userResponse.json();
      const userId = userData.id;

      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: playlistName,
          description: 'New playlist created with React app',
          public: false
        })
      });

      const playlistData = await playlistResponse.json();
      const playlistId = playlistData.id;

      await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          uris: playlist.map((song) => song.uri)
        })
      });

      alert('Playlist saved to Spotify!');
      setPlaylist([]); // Clear the playlist
      setPlaylistName(''); // Clear the playlist name
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  };

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AuthButton />
                <SearchBar searchedItem={searchedItem} handleChange={handleSearch} />
                <div className="container">
                  <SearchResults searchResultsE={searchResultsE} addToPlaylist={addToPlaylist} />
                  <Playlist
                    playlist={playlist}
                    removeFromPlaylist={removeFromPlaylist}
                    playlistName={playlistName}
                    handleNameChange={handleNameChange} 
                    savePlaylist={savePlaylist}
                  />
                </div>
              </>
            }
          />
          <Route path="/callback" element={<CallbackPage setAccessToken={setAccessToken} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
