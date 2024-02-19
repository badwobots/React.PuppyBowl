import React, { useState } from 'react';

const NewPlayerForm = ({ addNewPlayer }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('');
  const [image, setImage] = useState('');
  const [teamId, setTeamId] = useState('');
  
//Moved handleNewPlayersubmit function and field reset to newplayerform when transfer to component from App.jsx
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
  };

  export default NewPlayerForm;