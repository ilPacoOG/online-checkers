import express from 'express';
import { generateAIMove } from '../../../controllers/aiService.js';
import { PieceType } from '../../../types/types.js';

const router = express.Router();

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


export default router;
