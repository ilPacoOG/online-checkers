import { Router, Request, Response } from 'express';
import { User } from '../../../models/index.js';

// GET /Users
export const getAllUsers = async ( _req: Request, res: Response) => {
    try {
        // grabbing info for user including id and email, leaving out the password
        const users= await User.findAll({
            attributes: {exclude: ['password']}
        });   
        res.json(users);
        // error message
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
};

// GET /Users/:id
export const getUserById = async (req: Request, res: Response) => {
    // it is grabbing the id paramater
    const { id } = req.params
    try { 
        // finding a user by primary key
        const user = await User.findByPk( id, {
            attributes: { exclude: ['password']}
        });
        if (user) {
            // returns the user if user is true
            res.json(user)
        } else {
            // returns message if no user is found
            res.status(404).json({message: 'No User Found'})
        }
        // error message
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
};

// POST /Users
export const createUser = async (req: Request, res: Response) => {
    try {
        const newUser = req.body
    //    creating a newUser with the hashed password and saving to DB
       const userData = await User.create(newUser);
        res.status(201).json(userData)
        // error message
    } catch (error: any) {
        res.status(400).json({ message: error.message });
      }
};

// PUT /Users/:id
export const updateUser = async  (req: Request, res: Response) => {
    const { id } = req.params;
    const { email, password} = req.body;
    try {
        // grabbing a user by primary key
        const user = await User.findByPk(id)
        // if user is true update the email and password
        if (user) {
            user.email = email;
            user.password = password
            await user.save();
            res.json(user);
            // else give user not found message
        } else {
            res.status(404).json({message: 'User Not Found'})
        }
        // error message
    } catch (error: any) {
        res.status(400).json({ message: error.message });
     }
};

// DELETE /Users/:id
export const deleteUser = async (req: Request, res: Response)  => {
    const { id } = req.params;
    try {
        // grabbing a user by primary key
        const user = await User.findByPk(id)
        // if user is true delete the user
        if (user) {
            await user.destroy();
            res.json(204).send();
            // else give uer not found message
        } else {
            res.status(404).json ({ message: 'User Not Found'})
        }
            // error message
    } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
}

const router = Router();

// Get all users
router.get('/', getAllUsers);

// Get all users by id
router.get('/:id', getUserById);

// create a new user
router.post('/', createUser);

// Update a user by its id
router.put('/:id', updateUser);

// Delete a user by its id
router.delete('/:id', deleteUser);

export {router as userRouter}
