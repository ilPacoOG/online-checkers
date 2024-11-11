import OpenAI from 'openai';
import { PieceType } from '../types/types.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIMove(
    board: PieceType[][]
): Promise<{ start: [number, number], end: [number, number] }> {
    const boardState = JSON.stringify(board);

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are an AI playing checkers and should respond only in JSON format.',
                },
                {
                    role: 'user',
                    content: `The current board state is as follows: ${boardState}. Based on this board, provide the next move in JSON format as { "start": [row, col], "end": [row, col] } without any explanation.`,
                },
            ],
            max_tokens: 50,
            temperature: 0.7,
        });
        //This could be an issue
        const aiResponse = response.choices[0].message && response.choices[0].message.content ? response.choices[0].message.content.trim() : '';

        // Attempt to parse the response as JSON
        try {
            const move = JSON.parse(aiResponse || '{}');
            if (move.start && move.end) {
                return move;
            } else {
                throw new Error("Invalid move format");
            }
        } catch (parseError) {
            console.error("Failed to parse AI response as JSON:", parseError);
            console.error("AI Response was:", aiResponse);
            throw new Error("Failed to generate AI move.");
        }

    } catch (error) {
        console.error("Error generating AI move:", error);
        throw new Error("Failed to generate AI move.");
    }
}
