import React, { useState, useEffect } from 'react';
import PlayerCard from './component/PlayerCard';
import NewPlayerForm from './component/NewPlayerFrom';
import './form.css'

//API linmk Information
const cohortName = '2308-ACC-PT-WEB-PT-B';
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  //Added search const
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Filter players based on name
    const results = players.filter(player =>
      player.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, players]);

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

  const handleRemovePlayer = async (playerId) => {
    await removePlayer(playerId);
  };

  const handleSeeDetails = async (playerId) => {
    await fetchSinglePlayer(playerId);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };
//Changed newPlayerForm to component
  return (
    <div className="App">
    <div>
        <input
          type="text"
          placeholder="Search puppy players."
          value={searchTerm}
          onChange={handleSearch}
        />
         <NewPlayerForm addNewPlayer={addNewPlayer} />
      </div>
      <ul>
        {searchResults.map((player) => (
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
    </div>
  );
};

export default App;