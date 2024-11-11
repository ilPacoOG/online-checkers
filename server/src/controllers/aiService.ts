import OpenAI from 'openai';
import { PieceType } from '../types/types';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates the AI's move based on the current board state.
 * @param board Current game board as a 2D array of PieceTypes.
 * @param previousMoves Array of previous invalid moves to avoid.
 * @returns The AI's move as a starting and ending position.
 */
export async function generateAIMove(
    board: PieceType[][],
    previousMoves: Array<{ start: [number, number]; end: [number, number] }> = []
): Promise<{ start: [number, number], end: [number, number] }> {
    const boardState = JSON.stringify(board);
    const previousMovesText = previousMoves.length > 0 ? JSON.stringify(previousMoves) : '[]';

    try {
        console.log("Sending request to OpenAI API with board state and previous invalid moves...");

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: `You are an AI playing checkers on an 8x8 board against a human player. The board orientation is as follows:
                    - Row 0 is the top of the board and Row 7 is the bottom.
                    - Columns range from 0 to 7 from left to right.
                    Follow these standard checkers rules:
                    - Regular AI pieces ("2") can only move forward diagonally (downward for the AI).
                    - Only move pieces marked as "2" on the board, representing your standard pieces, or "4", representing your king pieces. 
                    -Do NOT move any pieces marked as "1" or "3", which represent the opponent's pieces.
                    -It is forbidden for the AI to move any other pieces.
                    -The AI is playing against a human opponent who moves pieces marked as "1" or "3".
                    -The AI must immediately a valid move based on the current board state after the human player makes a move.
                    - AI kings ("4") can move in any diagonal direction.
                    - Capturing moves can only be made if there is an opponent's piece between the start and end positions, and the destination is empty.
                    - Do not move into a square that is already occupied by another piece, including your own.
                    - Avoid suggesting any moves that match these previous invalid moves: ${previousMovesText}.
                    - Do not continue to suggest the same invalid moves until the board and piece placement has changed to allow the previously invalid moves to be valid moves. 
                    - Do not move any pieces marked "2" or "4" from rows 6 or 7 until adjacent pieces marked "2" or "4" have been moved from row 5.
                    - If piece marked "1" moves to row 7, it will be promoted to a king ("3") and it cannot be captured until it moves and can be captured with a legal diagonal move.
                    - If piece marked "2" moves to row 0, it will be promoted to a king ("4") and it cannot be captured until it moves and can be captured with a diagonal move. 
                    Provide the next move in JSON format as { "start": [row, col], "end": [row, col] } without any additional explanation.`
                },
                {
                    role: 'user',
                    content: `The current board state is as follows: ${boardState}. Based on this board, provide the next move in JSON format as { "start": [row, col], "end": [row, col] } without any explanation.`
                }
            ],
            max_tokens: 50,
            temperature: 0.7,
        });

        const aiResponse = response.choices[0].message?.content?.trim() || '';
        console.log("AI raw response content:", aiResponse);

        // Attempt to parse the response as JSON
        try {
            const move = JSON.parse(aiResponse);
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
