import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home: FC = () => {
  const navigate = useNavigate();

  const handlePlayGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-container">
      <h1>Online Checkers</h1>
      <div className="menu">
        <button className="play-button" onClick={handlePlayGame}>
          Play Game
        </button>
        <button className="rules-button" onClick={() => navigate('/rules')}>
          Rules
        </button>
      </div>
    </div>
  );
};

export default Home; 