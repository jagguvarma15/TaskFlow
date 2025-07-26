import { Router } from 'express';

const router = Router();

// GET /api/tasks
router.get('/', async (req, res) => {
  res.json({ tasks: [] });
});

// POST /api/tasks
router.post('/', async (req, res) => {
  res.status(201).json({ message: 'Task created' });
});

// PUT /api/tasks/:id
router.put('/:id', async (req, res) => {
  res.json({ message: 'Task updated' });
});

// DELETE /api/tasks/:id
router.delete('/:id', async (req, res) => {
  res.json({ message: 'Task deleted' });
});

export default router; 