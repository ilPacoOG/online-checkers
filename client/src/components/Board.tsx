import { PieceType, Coordinates } from '../types/types';
export async function getAIMove(board: PieceType[][]): Promise<Coordinates | null> {
    const boardState = JSON.stringify(board); // Convert the board to a JSON string
    const prompt = `
        You are playing a game of checkers as the AI. Here is the current board state:
        ${boardState}
        Provide the coordinates for your move in the format {"from": {"row": 5, "col": 2}, "to": {"row": 4, "col": 3}}.
        Follow checkers rules strictly and ensure the move is valid.
    `;
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            max_tokens: 50,
            temperature: 0.7,
        });
        // Parse and return the response as Coordinates
        const move = JSON.parse(response.data.choices[0].text.trim());
        return move;
    } catch (error) {
        console.error("Error getting AI move:", error);
        return null;
    }
}