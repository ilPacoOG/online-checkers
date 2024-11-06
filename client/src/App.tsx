import { FC } from 'react'
import Board from './components/Board'
import './App.css'

const App: FC = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Online Checkers</h1>
      </header>
      <main className="app-main">
        <Board />
      </main>
    </div>
  )
}

export default App
