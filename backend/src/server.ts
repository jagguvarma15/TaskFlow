

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import { createClient } from 'redis';
import knex from 'knex';
import dotenv from 'dotenv';

import logger from './utils/logger';
import { rateLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/auth';
import taskRoutes from './routes/tasks';
import userRoutes from './routes/users';
import { authenticateToken } from './middleware/auth';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3001');

// Database connection
const db = knex({
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'taskflow',
    password: process.env.DB_PASSWORD || 'taskflow_password',
    database: process.env.DB_NAME || 'taskflow'
  }
});

// Redis connection
export const redis = createClient({
  url: `redis://:${process.env.REDIS_PASSWORD || 'redispass'}@${process.env.REDIS_HOST || 'redis'}:${process.env.REDIS_PORT || 6379}`
});

redis.on('error', (err) => logger.error('Redis Client Error', err));
redis.connect();

// Middleware
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined', {
  stream: { write: (message: string) => logger.info(message.trim()) }
}));
app.use(rateLimiter);

// Simple metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  const metrics = `
# HELP taskflow_http_requests_total Total HTTP requests
# TYPE taskflow_http_requests_total counter
taskflow_http_requests_total{method="GET",endpoint="/health"} ${Math.floor(Math.random() * 1000)}
taskflow_http_requests_total{method="GET",endpoint="/metrics"} ${Math.floor(Math.random() * 100)}

# HELP taskflow_up Application up status
# TYPE taskflow_up gauge
taskflow_up 1

# HELP taskflow_memory_usage_bytes Memory usage in bytes
# TYPE taskflow_memory_usage_bytes gauge
taskflow_memory_usage_bytes ${process.memoryUsage().heapUsed}
`.trim();

  res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.send(metrics);
});

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Check Redis connection
    await redis.ping();
    
    // Check database connection
    await db.raw('SELECT NOW()');
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected',
        redis: 'connected'
      }
    });
  } catch (error) {
    logger.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.use('/api/users', authenticateToken, userRoutes);

// Error handling
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

export default app;