import { Request, Response, NextFunction } from 'express';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.sendStatus(401);
    return;
  }

  // Mock token validation - replace with actual JWT verification
  if (token === 'mock-token') {
    next();
  } else {
    res.sendStatus(403);
  }
}; 