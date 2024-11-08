// import { type Request, type Response } from 'express';
// import { OpenAI } from '@langchain/openai';
// const { Configuration, OpenAIApi } = require("openai");
// import { PromptTemplate } from '@langchain/core/prompts';
// // import dotenv from 'dotenv';
// // const router = express.Router();

// // dotenv.config();

// // grabs the OpenAi API key from enviroment variables
// const apiKey = process.env.OPENAI_API_KEY;
// let model: OpenAI;

// if (apiKey) {
//   model = new OpenAI({temperature: 0, openAIApiKey: apiKey, modelName: 'gpt-3.5-turbo'});
// } else {
//     console.error('OPENAI_API_KEY is not configured');
// }

// async function getAIMove(boardState: any, currentPlayer: any) {
//     const prompt = `You are playing a game of checkers against a user on the website. The current board state is: ${JSON.stringify(boardState)}. Its ${currentPlayer}'s turn. Please suggest the best move possible in the format of: "". Please follow checkers rules strictly(there is absolutely no moving backwards, unless you are a king.) `
// }

import OpenAI from 'openai';
import { PieceType } from '../types/types';

// Initialize OpenAI API client with configuration
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generates the AI's move based on the current board state.
 * @param board Current game board as a 2D array of PieceTypes
 * @returns The AI's move as a starting and ending position
 */
export async function generateAIMove(
    board: PieceType[][]
): Promise<{ start: [number, number], end: [number, number] }> {
    const boardState = JSON.stringify(board);

    try {
        // Update the completion request
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: `You are playing checkers as the AI. The current board state is as follows: ${boardState}. What is your next move? Provide the starting and ending coordinates in the format {start: [row, col], end: [row, col]}.`,
            max_tokens: 50,
            temperature: 0.7,
        });

        const move = JSON.parse(response.choices[0].text.trim());
        return move;
    } catch (error) {
        console.error("Error generating AI move:", error);
        throw new Error("Failed to generate AI move.");
    }
}
