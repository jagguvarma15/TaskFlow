import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiter = new RateLimiterMemory({
  keyPrefix: 'middleware',
  points: 100, // Number of requests
  duration: 60, // Per 60 seconds
});

export const rateLimiter = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    await limiter.consume(req.ip || 'unknown');
    next();
  } catch (rejRes) {
    res.status(429).json({ error: 'Too Many Requests' });
  }
}; 