// src/components/AuthButton/AuthButton.js
import React from 'react';
import config from '../../config';

const AuthButton = () => {
  const { clientId, redirectUri } = config;
  const scopes = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';
  const responseType = 'code';

  const handleLogin = () => {
    const authUrl = `https://accounts.spotify.com/authorize?response_type=${responseType}&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`;
    window.location.href = authUrl;
  };

  return <button onClick={handleLogin}>Login with Spotify</button>;
};

export default AuthButton;
