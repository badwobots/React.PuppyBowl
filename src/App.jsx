import React, { useState, useEffect } from 'react';
import PlayerCard from './component/PlayerCard';
import './form.css'

const cohortName = '2308-ACC-PT-WEB-PT-B';
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [teamId, setTeamId] = useState('');

  useEffect(() => {
    fetchAllPlayers();
  }, []);

  const fetchAllPlayers = async () => {
    try {
      const response = await fetch(APIURL + "/players");
      if (!response.ok) {
        throw new Error("Failed to fetch players!");
      }
      const { data } = await response.json();
      console.log(data);
      setPlayers(data.players);
    } catch (error) {
      console.error('Error fetching players!', error);
    }
  };

  const fetchSinglePlayer = async (playerId) => {
    try {
      const response = await fetch(APIURL + "/players/" + playerId);
      if (!response.ok) {
        throw new Error(`Failed to fetch player #${playerId}`);
      }
      const playerData = await response.json();
      console.log(`Fetched player #${playerId}:`, playerData);
      setSelectedPlayer(playerData.data.player);
    } catch (err) {
      console.error(`Error fetching player #${playerId}!`, err);
    }
  };

  const addNewPlayer = async (playerObj) => {
    try {
      const response = await fetch(APIURL + "/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(playerObj),
      });
      if (!response.ok) {
        throw new Error("Failed to create new player");
      }
      await fetchAllPlayers();
      console.log(response);
    } catch (err) {
      console.error('Error adding that player!', err);
    }
  };

  const removePlayer = async (playerId) => {
    try {
      const response = await fetch(APIURL + "/players" + `/${playerId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        console.log("Failed to delete player. Response status:", response.status);
        throw new Error("Failed to delete player");
      }
      await fetchAllPlayers();
      console.log(response);
    } catch (err) {
      console.error(`Error removing player #${playerId} from the roster!`, err);
    }
  };

  const renderNewPlayerForm = () => {
    try {
      return (
        <form className='npform' onSubmit={handleNewPlayerSubmit}>
          <label>
            <p> 
            Name: {" "}
            <input
            label="name"
            type="text"
            id="name"
            placeholder="Puppy 4-20 characters"
            minLength={4}
            maxLength={20}
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </p>
        </label>
        <label>
            <p>
            Breed: {" "}
            <input
            label="breed"
            type="text"
            id="breed"
            placeholder="Breed 1-20 characters"
            minLength={1}
            maxLength={20}
            required
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
          </p>
        </label>
        <label>
          <p>
          Status: {" "}
          <select
            label="status"
            id="status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="" disabled>Please Select One:</option>
            <option value="bench">bench</option>
            <option value="field">field</option>
          </select>
          </p>
        </label>
        <label>
            <p> 
            Photo: {" "}
            <input
            label="image"
            type="text"
            id="image"
            placeholder="Image Url"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
          </p>
        </label>
        <label> 
            <p>
            TeamID: {" "}
            <input
            label="teamId"
            type="text"
            id="teamId"
            placeholder="Enter Team ID"
            required
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
          />
          </p>
        </label>
        <button>Submit</button>
        </form>
      );
    } catch (err) {
      console.error('Error rendering the new player form!', err);
    }
  };

  const handleNewPlayerSubmit = async (event) => {
    event.preventDefault();
    const playerObj = {
      name,
      breed,
      status,
      image,
      teamId
    };
    await addNewPlayer(playerObj);
    setName('');
    setBreed('');
    setStatus('');
    setImage('');
    setTeamId('');
  };

  const handleRemovePlayer = async (playerId) => {
    await removePlayer(playerId);
  };

  const handleSeeDetails = async (playerId) => {
    await fetchSinglePlayer(playerId);
  };

  return (
    <div className="App">
      <ul>
        {players.map((player) => (
          <PlayerCard
            key={player.id}
            player={player}
            onRemove={handleRemovePlayer}
            onDetails={handleSeeDetails}
          />
        ))}
      </ul>
      {selectedPlayer && (
        <div>
          <h2>{selectedPlayer.name}</h2>
          {<li><img src={selectedPlayer.imageUrl} alt={selectedPlayer.name} width="125" height="125" />
            <p>ID: {selectedPlayer.id}</p>
            <p>Breed: {selectedPlayer.breed}</p>
            <p>Url: {selectedPlayer.imageUrl}</p>
            <p>Status: {selectedPlayer.status}</p>
            <p>Team ID: {selectedPlayer.teamId}</p>
            <p>Created: {selectedPlayer.createdAt}</p>
            <p>Last Update: {selectedPlayer.updatedAt}</p>
            <p>Cohort ID: {selectedPlayer.cohortId}</p></li>}
        </div>
      )}
      {renderNewPlayerForm()}
    </div>
  );
};

export default App;