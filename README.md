# TaskFlow - AI-Powered Task Management

TaskFlow is a modern, containerized task management application built with React, Node.js, and a comprehensive monitoring stack. This project demonstrates production-ready Docker containerization, microservices architecture, and observability patterns.

## Architecture Overview

TaskFlow consists of a multi-container architecture designed for learning Docker, Kubernetes, and modern DevOps practices:

- **Frontend**: React application with AI-powered interface
- **Backend**: Node.js REST API with Express
- **Database**: PostgreSQL for persistent data storage
- **Cache**: Redis for session management and caching
- **Monitoring**: Complete observability stack with Prometheus, Grafana, and Loki

## Prerequisites

- Docker Desktop 4.0+ with Docker Compose
- Git
- 8GB+ RAM available for containers
- Ports available: 3000, 3001, 3004, 5433, 6379, 8081, 9090, 9093, 9100, 3100

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TaskFlow
```

### 2. Start the Main Application

```bash
# Start core services
docker compose up postgres redis backend frontend -d

# Verify services are healthy
docker compose ps
```

### 3. Start the Monitoring Stack

```bash
# Start monitoring services
docker compose -f docker-compose.monitoring.yml up -d

# Wait for all services to be ready
sleep 30
```

### 4. Verify Installation

```bash
# Check all containers are running
docker compose ps -a

# Test main application
curl http://localhost:3000

# Test backend health
curl http://localhost:3001/health

# Test metrics endpoint
curl http://localhost:3001/metrics
```

## Service Access URLs

| Service | URL | Credentials | Purpose |
|---------|-----|-------------|---------|
| TaskFlow App | http://localhost:3000 | - | Main application interface |
| Backend API | http://localhost:3001 | - | REST API and health checks |
| Grafana | http://localhost:3004 | admin / admin123 | Dashboards and visualization |
| Prometheus | http://localhost:9090 | - | Metrics collection and queries |
| cAdvisor | http://localhost:8081 | - | Container resource monitoring |
| AlertManager | http://localhost:9093 | - | Alert routing and management |
| Loki | http://localhost:3100 | - | Log aggregation API |
| PostgreSQL | localhost:5433 | taskflow / taskflow_password | Database access |
| Redis | localhost:6379 | Password: redispass | Cache and sessions |

## Screenshots

### TaskFlow Frontend Interface

<img width="1574" height="880" alt="TaskFlow_Dashboard" src="https://github.com/user-attachments/assets/bb49fae0-5fbf-40b7-b779-b5ac8d79c843" />


### Grafana Dashboard

<img width="1568" height="887" alt="Grafana_metrics_alerting" src="https://github.com/user-attachments/assets/21d8918d-2bd0-4075-b43e-3ce9c8f3967a" />


### Prometheus Targets

<img width="1568" height="778" alt="Prometheus_status" src="https://github.com/user-attachments/assets/cd306ac2-b191-4db3-8b19-e804aca90d92" />

## Container Architecture

### Core Application Services

```yaml
# Main application stack
services:
  frontend:    # React app served by Nginx
  backend:     # Node.js API server
  postgres:    # PostgreSQL database
  redis:       # Redis cache layer
```

### Monitoring Services

```yaml
# Observability stack
services:
  prometheus:     # Metrics collection
  grafana:        # Visualization
  loki:           # Log aggregation  
  promtail:       # Log shipping
  cadvisor:       # Container metrics
  node-exporter:  # System metrics
  alertmanager:   # Alert routing
```

## Development Workflow

### Building and Rebuilding

```bash
# Rebuild specific service
docker compose build frontend --no-cache
docker compose build backend --no-cache

# Restart services
docker compose restart backend frontend

# View logs
docker compose logs -f backend
docker compose logs -f frontend
```

### Scaling Services

```bash
# Scale backend horizontally
docker compose up --scale backend=3

# Scale with load balancer (requires additional config)
docker compose up --scale backend=3 --scale frontend=2
```

### Database Operations

```bash
# Connect to PostgreSQL
docker exec -it taskflow_postgres psql -U taskflow -d taskflow

# Backup database
docker exec taskflow_postgres pg_dump -U taskflow taskflow > backup.sql

# Restore database
docker exec -i taskflow_postgres psql -U taskflow taskflow < backup.sql
```

### Redis Operations

```bash
# Connect to Redis
docker exec -it taskflow_redis redis-cli -a redispass

# Monitor Redis operations
docker exec taskflow_redis redis-cli -a redispass monitor

# Check Redis info
docker exec taskflow_redis redis-cli -a redispass info
```

## Monitoring and Observability

### Setting up Grafana Dashboards

1. Access Grafana at http://localhost:3004
2. Login with `admin` / `admin123`
3. Add Prometheus data source: `http://taskflow_prometheus:9090`
4. Add Loki data source: `http://taskflow_loki:3100`
5. Import dashboard templates:
   - Node Exporter: Dashboard ID 1860
   - Docker Containers: Dashboard ID 193
   - Custom TaskFlow metrics: Create new dashboard
   

### Prometheus Queries

```promql
# HTTP request rate
rate(taskflow_http_requests_total[5m])

# Memory usage
taskflow_memory_usage_bytes

# Container CPU usage
rate(container_cpu_usage_seconds_total[5m])

# Database connections
pg_stat_database_numbackends
```

### Log Queries in Loki

```logql
# Backend application logs
{container_name="taskflow_backend"}

# Error logs only
{container_name="taskflow_backend"} |= "ERROR"

# Logs from last hour with filtering
{container_name="taskflow_backend"} [1h] |= "health"
```

## Environment Configuration

### Backend Environment Variables

```bash
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=taskflow
DB_PASSWORD=taskflow_password
DB_NAME=taskflow

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=redispass

# Application
PORT=3001
NODE_ENV=production
```

### Frontend Environment Variables

```bash
# API Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=production
```

## Health Checks and Diagnostics

### Application Health

```bash
# Backend health check
curl http://localhost:3001/health

# Expected response:
{
  "status": "healthy",
  "timestamp": "2025-01-27T01:32:57.756Z",
  "services": {
    "database": "connected",
    "redis": "connected"
  }
}
```

### Container Health

```bash
# Check container health status
docker compose ps --format "table {{.Service}}\t{{.Status}}\t{{.Ports}}"

# View container resource usage
docker stats

# Inspect specific container
docker inspect taskflow_backend
```

### Troubleshooting

#### Common Issues

1. **Port Conflicts**: Ensure ports 3000, 3001, 5433, 6379 are available
2. **Memory Issues**: Increase Docker Desktop memory limit to 8GB+
3. **Network Issues**: Check if containers are on the same network
4. **Build Failures**: Clear Docker cache with `docker system prune -a`

#### Logs and Debugging

```bash
# View application logs
docker compose logs backend frontend

# Follow logs in real-time
docker compose logs -f --tail=100 backend

# Check specific container logs
docker logs taskflow_prometheus

# Access container shell
docker exec -it taskflow_backend sh
```

## Production Considerations

### Security

- Change default passwords in production
- Use environment files for sensitive data
- Implement proper authentication and authorization
- Enable HTTPS with SSL certificates
- Configure firewall rules and network policies

### Performance

- Implement connection pooling for database
- Configure Redis memory limits and eviction policies
- Set up proper logging levels
- Implement rate limiting and request throttling
- Use production-grade reverse proxy (Nginx/Traefik)

### Monitoring

- Set up alerting rules for critical metrics
- Configure log retention policies
- Implement distributed tracing
- Monitor business metrics alongside technical metrics
- Set up automated backup procedures

## Kubernetes Migration

This Docker Compose setup serves as a foundation for Kubernetes deployment:

1. **Convert to K8s manifests**: Use Kompose or manual conversion
2. **Implement ConfigMaps**: For environment configuration
3. **Add Secrets**: For sensitive data management
4. **Configure Ingress**: For external access routing
5. **Set up Persistent Volumes**: For data persistence
6. **Implement HPA**: For auto-scaling capabilities

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make changes and test with Docker
4. Ensure all containers build and run successfully
5. Update documentation as needed
6. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check the troubleshooting section above
- Review container logs for error details
- Ensure all prerequisites are met
- Verify port availability and Docker resources
