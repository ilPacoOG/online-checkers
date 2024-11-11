import express from 'express';
import { generateAIMove } from '../../../controllers/aiService.js';

const router = express.Router();
const invalidMoves: Array<{ start: [number, number]; end: [number, number] }> = [];

router.post('/move', async (req, res) => {
    try {
        const { board } = req.body;
        console.log("Received board state:", board);

        if (!Array.isArray(board) || !board.every(row => Array.isArray(row))) {
            console.error("Invalid board format received.");
            return res.status(400).json({ error: "Invalid board format" });
        }

        const move = await generateAIMove(board, invalidMoves);
        console.log("Generated AI move:", move);

        return res.json(move);  // Always return a response
    } catch (error) {
        console.error("Error generating AI move:", error);
        return res.status(500).json({ error: "Failed to generate AI move" });
    }
});

router.post('/feedback', async (req, res) => {
    const { board, invalidMove } = req.body;

    try {
        if (invalidMove) {
            invalidMoves.push(invalidMove);  // Add invalid move to list
        }

        const newMove = await generateAIMove(board, invalidMoves);
        res.json(newMove);
    } catch (error) {
        console.error("Error generating new AI move:", error);
        res.status(500).json({ error: "Failed to generate new AI move" });
    }
});

export default router;
