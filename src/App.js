// src/App.js

import React, { useState, useEffect } from 'react';
import Header from './header';
import './App.css';
import SearchBar from './search-bar';

function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userImages, setUserImages] = useState({});

  useEffect(() => {
    // Fetch user data from the API
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Function to generate a random number for the user's unique image
  const generateRandomNumber = () => {
    return Math.floor(Math.random() * 1000); // Adjust the range as needed
  };

  useEffect(() => {
    // Generate unique image URLs for each user
    const imageUrls = {};
    users.forEach(user => {
      imageUrls[user.id] = `https://robohash.org/${generateRandomNumber()}`;
    });
    setUserImages(imageUrls);
  }, [users]);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Header />
      <div className='main'>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      <div className="user-list">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <img
              src={userImages[user.id]} // Use the unique image URL
              alt={`User ${user.id}`}
              className="user-image"
            />
            <span className="bold">{user.name}</span>
            <p>{user.email}</p>
            <p>{user.phone}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default App;