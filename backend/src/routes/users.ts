import { Router } from 'express';

const router = Router();

// GET /api/users/profile
router.get('/profile', async (req, res) => {
  res.json({ user: { id: 1, email: 'user@example.com' } });
});

// PUT /api/users/profile
router.put('/profile', async (req, res) => {
  res.json({ message: 'Profile updated' });
});

export default router; 