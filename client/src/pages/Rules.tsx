import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rules.css';

const Rules: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="rules-container">
      <h1>How to Play Checkers</h1>
      
      <div className="rules-content">
        <section>
          <h2>Basic Rules</h2>
          <ul>
            <li>Players take turns moving their pieces diagonally forward</li>
            <li>Regular pieces can only move forward</li>
            <li>Kings can move both forward and backward</li>
            <li>Pieces must move to an empty square</li>
            <li>Red pieces move first</li>
          </ul>
        </section>

        <section>
          <h2>Capturing</h2>
          <ul>
            <li>Capture opponent's pieces by jumping over them</li>
            <li>Multiple captures are allowed in a single turn</li>
            <li>If a capture is available, it must be taken</li>
            <li>Captured pieces are removed from the board</li>
          </ul>
        </section>

        <section>
          <h2>Kings</h2>
          <ul>
            <li>Pieces become kings when they reach the opposite end</li>
            <li>Kings can move and capture backwards</li>
            <li>Kings are marked with a crown symbol</li>
            <li>Kings must complete all available captures</li>
          </ul>
        </section>

        <section>
          <h2>Winning</h2>
          <ul>
            <li>Capture all opponent's pieces</li>
            <li>Or block all opponent's pieces from moving</li>
            <li>The game is a draw if no player can win</li>
          </ul>
        </section>
      </div>

      <button className="back-button" onClick={() => navigate('/game')}>
        Back to Game
      </button>
    </div>
  );
};

export default Rules;