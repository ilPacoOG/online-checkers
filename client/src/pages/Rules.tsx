// Import necessary dependencies
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import './Rules.css';

// Rules component - displays game rules and instructions
const Rules: FC = () => {
  // Hook for navigation between pages
  const navigate = useNavigate();

  return (
    // Main container for rules page
    <div className="rules-container">
      {/* Page title */}
      <h1>How to Play Checkers</h1>
      
      {/* Container for all rules sections */}
      <div className="rules-content">
        {/* Basic rules section */}
        <section>
          <h2>Basic Rules</h2>
          <ul>
            <li>Players take turns moving their pieces diagonally forward</li>
            <li>Regular pieces can only move forward</li>
            <li>Kings can move both forward and backward</li>
            <li>Pieces must move to an empty square</li>
          </ul>
        </section>

        {/* Capturing rules section */}
        <section>
          <h2>Capturing</h2>
          <ul>
            <li>Capture opponent's pieces by jumping over them</li>
            <li>Multiple captures are allowed in a single turn</li>
            <li>If a capture is available, it must be taken</li>
          </ul>
        </section>

        {/* King pieces rules section */}
        <section>
          <h2>Kings</h2>
          <ul>
            <li>Pieces become kings when they reach the opposite end</li>
            <li>Kings can move and capture backwards</li>
            <li>Kings are marked with a crown symbol</li>
          </ul>
        </section>

        {/* Win conditions section */}
        <section>
          <h2>Winning</h2>
          <ul>
            <li>Capture all opponent's pieces</li>
            <li>Or block all opponent's pieces from moving</li>
          </ul>
        </section>
      </div>

      {/* Navigation button to return to home */}
      <button className="back-button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
};

export default Rules; 