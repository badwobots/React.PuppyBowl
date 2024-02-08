import React from 'react';

const PlayerCard = ({ player, onRemove, onDetails }) => {
  return (
    <li>
      <h2>{player.name}</h2>
      <img src={player.imageUrl} alt={player.name} width="125" height="125" />
      <p>Breed: {player.breed}</p>
      <p>Status: {player.status}</p>
      <p>Team ID: {player.teamId}</p>
      <button className="delete-button" onClick={() => onRemove(player.id)}>Delete</button>
      <button className="details-button" onClick={() => onDetails(player.id)}>See Details</button>
    </li>
  );
};

export default PlayerCard;