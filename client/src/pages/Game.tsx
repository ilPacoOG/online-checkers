// Import necessary dependencies and types
import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { gameAPI } from '../services/apiService';
import Board from '../components/Board';
import './Game.css';

/**
 * Game Component
 * Main container for the checkers game
 * Handles game state management and API interactions
 */
const Game: FC = () => {
  // Get authentication context and navigation
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // State for managing the current game state
  const [gameState, setGameState] = useState(null);

  // State for tracking game status
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Effect hook to check authentication
   * Redirects to login if user is not authenticated
   */
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  /**
   * Handles saving the current game state
   * Makes API call to persist game data
   */
  const handleSaveGame = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await gameAPI.saveGame(gameState);
      // Optional: Show success message
    } catch (error) {
      setError('Failed to save game. Please try again.');
      console.error('Save game error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handles loading a saved game
   * @param gameId - ID of the game to load
   */
  const handleLoadGame = async (gameId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const savedGame = await gameAPI.loadGame(gameId);
      setGameState(savedGame);
    } catch (error) {
      setError('Failed to load game. Please try again.');
      console.error('Load game error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Callback for updating game state from the Board component
   * @param newState - New game state from the board
   */
  const handleStateChange = (newState: any) => {
    setGameState(newState);
  };

  /**
   * Handles starting a new game
   * Resets the game state
   */
  const handleNewGame = () => {
    setGameState(null);
    // Additional reset logic if needed
  };

  // Show loading spinner while operations are in progress
  if (isLoading) {
    return (
      <div className="game-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="game-container">
      {/* Game header with user info */}
      <div className="game-header">
        <h2>Welcome, {user?.email}</h2>
        <div className="game-controls">
          <button 
            onClick={handleNewGame}
            className="control-button"
          >
            New Game
          </button>
          <button 
            onClick={handleSaveGame}
            className="control-button"
            disabled={!gameState}
          >
            Save Game
          </button>
        </div>
      </div>

      {/* Error message display */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Main game board */}
      <div className="game-content">
        <Board 
          onStateChange={handleStateChange}
          initialState={gameState}
        />
      </div>

      {/* Game status and info */}
      <div className="game-info">
        {/* Add game status, scores, or other info here */}
      </div>
    </div>
  );
};

export default Game;