import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // adjust as needed

export const gameService = {
  async createGame() {
    return axios.post(`${API_URL}/games`);
  },
  
  async makeMove(gameId: string, from: Position, to: Position) {
    return axios.post(`${API_URL}/games/${gameId}/moves`, { from, to });
  },
  
  async getGameState(gameId: string) {
    return axios.get(`${API_URL}/games/${gameId}`);
  }
};