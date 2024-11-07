// Import necessary dependencies
import { FC } from 'react'; // FC (FunctionComponent) type from React
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import './Home.css'; // Import associated styles

// Define Home component as a Function Component
const Home: FC = () => {
  // Initialize the navigate function from react-router-dom
  // This will be used to programmatically navigate between routes
  const navigate = useNavigate();

  // Render the component
  return (
    // Main container for the home page
    <div className="home-container">
      {/* Title of the game */}
      <h1>Online Checkers</h1>

      {/* Menu container for buttons */}
      <div className="menu">
        {/* Play Game button */}
        {/* Uses the handlePlayGame function when clicked */}
        <button className="play-button" onClick={() => navigate('/login')}>
          Play Game
        </button>

        {/* Rules button */}
        {/* Uses inline arrow function to navigate to rules page */}
        {/* This is an alternative to creating a separate handler function */}
        <button className="rules-button" onClick={() => navigate('/rules')}>
          Rules
        </button>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the application
export default Home;