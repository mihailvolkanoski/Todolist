import express from 'express';
import { Session } from 'supertokens-node/recipe/session';

const router = express.Router();

// Middleware to check if user is logged in
const isAuthenticated = Session.verifySession();

// Get all todos for the authenticated user
router.get('/', isAuthenticated, async (req, res) => {
    const todos = await fetchTodos(req.userId);
    res.json(todos);
});

// Add a new todo
router.post('/', isAuthenticated, async (req, res) => {
    const { title, description } = req.body; 
    const newTodo = await addTodo(req.userId, title, description); 
    res.status(201).json(newTodo);
});

// Update a todo
router.put('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body; 
    const updatedTodo = await updateTodo(req.userId, id, title, description); 
    res.json(updatedTodo);
});

// Delete a todo
router.delete('/:id', isAuthenticated, async (req, res) => {
    const { id } = req.params;
    await deleteTodo(req.userId, id); 
    res.status(204).send(); 
});

export default router;
