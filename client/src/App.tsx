// Import necessary dependencies
import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Import components
import Home from './pages/Home';
import Game from './pages/Game';
import Rules from './pages/Rules';
import Login from './components/Login';
import './App.css';

// Main App component
const App: FC = () => {
  return (
    // Router wrapper for navigation
    <Router>
      <div className="app">
        {/* Header section */}
        <header className="app-header">
          <h1>Online Checkers</h1>
        </header>
        {/* Main content area */}
        <main className="app-main">
          {/* Route definitions */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/game" element={<Game />} />
            <Route path="/rules" element={<Rules />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;