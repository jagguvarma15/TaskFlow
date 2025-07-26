import { Router } from 'express';

const router = Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  res.status(201).json({ message: 'User registered' });
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  res.json({ token: 'mock-token' });
});

// POST /api/auth/logout
router.post('/logout', async (req, res) => {
  res.json({ message: 'Logged out' });
});

export default router; 