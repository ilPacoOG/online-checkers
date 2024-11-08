import { Router, Request, Response } from 'express';

// POST for creating a new game
export const createGame = async (_req: Request, _res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

// GET for rendering the board
export const getGame = async (_req: Request, _res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

// POST to send a move to the server
export const sendMove = async (_req: Request, _res: Response) => {
    try {
        
    } catch (error) {
        
    }
}

// POST for ai move
export const aiMove = async (_req: Request, _res: Response) => {
    try {
        
    } catch (error) {
        
    }
}





const router = Router();

router.get('/', createGame);
router.get('/:gameId', getGame);
router.get('/:gameId/move', sendMove);
router.get('/:gameId/ai-move', aiMove);


export default router