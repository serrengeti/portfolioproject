import React from 'react';
import './Track.css';

function Track({song, action, addOrRemove}) {
  
  const handleClick = () => {
    if (action === "+"){
      addOrRemove(song, song.uri);
    } else if (action === "-") {
      addOrRemove(song.id, song.uri);
    }
  
  }

  return (
    <div className="Track">
      <span>
          {song.name}<br/>
          <span id="new">{song.artist} | {song.album}<br/></span>
      </span>
      <button onClick={handleClick}>{action}</button>
    </div>
  );
}

export default Track;
