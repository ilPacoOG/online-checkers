import { FC, useState, useEffect } from 'react';
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Board from '../components/Board';
import './Game.css';
import axios from 'axios';

const Game: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
 // State for storing the background image URL
 const [backgroundImage, setBackgroundImage] = useState<string>('');
 const [loading, setLoading] = useState<boolean>(true);
 const [error, setError] = useState<string | null>(null);

 // Fetch the background image from Pexels API on component mount
 useEffect(() => {
   const fetchBackgroundImage = async () => {
     try {
       // Make the API request to Pexels
       const response = await axios.get('https://api.pexels.com/v1/search', {
         headers: {
           Authorization: 'UR3ulVQekKy8xHa3dRt9s51wAyatfMS0Qr21ogHT7A858beywtQBEKDy',
         },
         params: {
           query: 'space background',
           per_page: 25,
         },
       });

       if (response.data.photos.length > 0) {
         const randomIndex = Math.floor(Math.random() * response.data.photos.length);
         const randomPhoto = response.data.photos[randomIndex];
         setBackgroundImage(randomPhoto.src.original); // Set the background image URL
       } else {
         setError('No space background image found');
       }
     } catch (error) {
       setError('Error fetching space background');
       console.error('Error fetching space background:', error);
     } finally {
       setLoading(false);
     }
   };

   fetchBackgroundImage();
 }, []); // Empty dependency array ensures this runs only once when the component mounts

 if (loading) {
   return <div>Loading...</div>; // Show loading text while fetching the image
 }

 if (error) {
   return <div>{error}</div>; // Show error message if there's an issue fetching the image
 }

 return (
   // Main game container with dynamic background image
   <div
     className="game-container"
     style={{
       backgroundImage: `url(${backgroundImage})`,
       backgroundSize: 'cover',
       backgroundPosition: 'center',
       height: '100vh',
       width: '100vh'
     }}>
      <div className="game-header">
        <div className="header-content">
          <h1>Checkers Game</h1>
          <span className="user-email">Logged in as: {user?.email}</span>
        </div>
        <div className="header-buttons">
          <Link to="/rules" className="rules-button">Rules</Link>
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>
      <div className="game-content">
        <div className="game-board">
          <Board />
        </div>
      </div>
    </div>
  );
};

export default Game;