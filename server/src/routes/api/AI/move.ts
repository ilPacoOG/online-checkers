import express from 'express';
import { generateAIMove } from '../../../controllers/aiService.js';
import { PieceType } from '../../../types/types.js';

const router = express.Router();

// AI Move Generation Route (already in place)
router.post('/move', async (req, res) => {
    try {
        const { board } = req.body;

        if (!Array.isArray(board) || !board.every(row => Array.isArray(row))) {
            return res.status(400).json({ error: "Invalid board format" });
        }

        const move = await generateAIMove(board as PieceType[][]);
        return res.json(move); // Return the AI's move
    } catch (error) {
        console.error("Error generating AI move:", error);
        return res.status(500).json({ error: "Failed to generate AI move" });
    }
});

// Create a New Game Route
router.post('/', (_req, res) => {
    // Placeholder logic for creating a game (e.g., initializing board state)
    const newGame = {
        gameId: 'some-unique-id', // Replace with actual ID generation logic
        message: 'Game created!',
    };
    return res.json(newGame);
});

// Player Move Route
router.post('/:gameId/move', (req, res) => {
    const { gameId } = req.params;
    const { start, end } = req.body;

    // Validate the start and end positions
    if (!start || !end || !Array.isArray(start) || !Array.isArray(end)) {
        return res.status(400).json({ error: "Invalid move format" });
    }

    // Placeholder for handling a player's move logic
    const moveResponse = {
        gameId,
        start,
        end,
        message: 'Player move executed',
    };
    return res.json(moveResponse);
});

export default router;
