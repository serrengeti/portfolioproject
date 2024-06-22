import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

function TrackList({playlist, action, addOrRemove}) {

  

  return (
    <div className="TrackList">
      {playlist.map((song) => (<Track song={song} key={song.id} action={action} addOrRemove={addOrRemove} />))}

    </div>
  );
}

export default TrackList;
