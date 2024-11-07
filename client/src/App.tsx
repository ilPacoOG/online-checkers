import { FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Board from './components/Board';
import './App.css';

const App: FC = () => {
  return (
    // Router wrapper for handling navigation
    <Router>
      <div className="app">
        <header className="app-header">
          <h1>Online Checkers</h1>
        </header>
        <main className="app-main">
          {/* Routes define the different pages in our app */}
          <Routes>
            {/* Home page route */}
            <Route path="/" element={<Home />} />
            {/* Game board route */}
            <Route path="/game" element={<Board />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;