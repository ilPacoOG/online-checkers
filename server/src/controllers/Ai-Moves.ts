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

