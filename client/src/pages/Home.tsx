// Import necessary dependencies
import { FC } from 'react'; // FC (FunctionComponent) type from React
import { useNavigate } from 'react-router-dom'; // Hook for programmatic navigation
import { useAuth } from '../context/AuthContext';
import './Home.css'; // Import associated styles

// Define Home component as a Function Component
const Home: FC = () => {
  // Initialize the navigate function from react-router-dom
  // This will be used to programmatically navigate between routes
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  console.log('Auth status:', isAuthenticated); // Add this for debugging

  // Render the component
  return (
    // Main container for the home page
    <div className="home-container"> 
      <div className="home-content">
        <h1>Welcome to Checkers</h1>
        <div className="button-group">
          {isAuthenticated ? (
            // If user is logged in
            <>
              <button 
                className="primary-button"
                onClick={() => navigate('/game')}
              >
                Play Game
              </button>
              <button 
                className="secondary-button"
                onClick={() => navigate('/profile')}
              >
                My Profile
              </button>
            </>
          ) : (
            // If user is not logged in
            <>
              <button 
                className="primary-button"
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button 
                className="create-account-button"
                onClick={() => navigate('/register')}
              >
                Create New Account
              </button>
            </>
          )}
          <button 
            className="rules-button"
            onClick={() => navigate('/rules')}
          >
            Game Rules
          </button>
        </div>
      </div>
    </div>
  );
};

// Export the component for use in other parts of the application
export default Home;