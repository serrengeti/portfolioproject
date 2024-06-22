// src/components/CallbackPage/CallbackPage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

const CallbackPage = ({ setAccessToken }) => {
  const navigate = useNavigate();
  const { clientId, clientSecret, redirectUri } = config;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    if (code) {
      fetchAccessToken(code);
    } else {
      console.error('Authorization code not found.');
    }
  }, [navigate, clientId, clientSecret, redirectUri]);

  const fetchAccessToken = async (code) => {
    const tokenUrl = 'https://accounts.spotify.com/api/token';

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    });

    try {
      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
      });

      const data = await response.json();

      if (data.access_token) {
        console.log('Access Token:', data.access_token);
        // Save the access token and use it to make API calls
        localStorage.setItem('spotify_access_token', data.access_token);
        setAccessToken(data.access_token);
        // Redirect to your app's main page
        navigate('/');
      } else {
        console.error('Failed to obtain access token.', data);
      }
    } catch (error) {
      console.error('Error fetching access token:', error);
    }
  };

  return (
    <div>
      <h1>Callback Page</h1>
      <p>Handling authorization callback...</p>
    </div>
  );
};

export default CallbackPage;
