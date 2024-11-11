// Import necessary dependencies
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Board from '../components/Board';
import './Game.css';

// Game component - handles the game page layout and navigation
const Game: FC = () => {
  // Hook for navigation between pages
  const navigate = useNavigate();
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the background image from your Express API
    const fetchBackgroundImage = async () => {
      try {
        const response = await fetch('http://localhost:3000/space-image');
        const data = await response.json();
        setBackgroundImage(data.backgroundImage);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    };

    fetchBackgroundImage();
  }, []); // Empty dependency array means it runs only once when the component mounts


  return (
    // Main game container
    <div className="game-container"
    
    style={{
      backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
      backgroundSize: 'cover', // Adjust the background size to cover the whole page
      backgroundPosition: 'center', // Center the image
      minHeight: '100vh', // Ensure it covers the full viewport height
    }}
    
    >
      {/* Game board section */}
      <div className="game-board">
        <Board />
      </div>

      {/* Game information and controls panel */}
      <div className="game-info">
        <h2>Game Status</h2>
        {/* Current player turn indicator */}
        <div className="status">Player's Turn</div>
        {/* Navigation button to return to home page */}
        <button className="back-button" onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default Game;