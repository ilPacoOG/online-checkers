import express from 'express';
import { generateAIMove } from '../../../controllers/aiService.js';

const router = express.Router();

router.post('/move', async (req, res) => {
    try {
        const { board } = req.body;
        console.log("Received board state:", board);

        if (!Array.isArray(board) || !board.every(row => Array.isArray(row))) {
            console.error("Invalid board format received.");
            return res.status(400).json({ error: "Invalid board format" });
        }

        const move = await generateAIMove(board);
        console.log("Generated AI move:", move);

        return res.json(move);  // Always return a response
    } catch (error) {
        console.error("Error generating AI move:", error);
        return res.status(500).json({ error: "Failed to generate AI move" });  // Add explicit return here
    }
});

export default router;
