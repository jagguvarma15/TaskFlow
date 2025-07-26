# TaskFlow - Enterprise Task Management System

A full-stack task management application with comprehensive monitoring and observability.

## 🚀 Features

- **Frontend**: React with TypeScript, modern UI components
- **Backend**: Node.js with Express, RESTful API
- **Database**: PostgreSQL with Redis caching
- **Authentication**: JWT-based auth system
- **Monitoring**: Prometheus, Grafana, Loki log aggregation
- **Containerized**: Docker with development and production profiles
- **Health Checks**: Service monitoring and alerting

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- 8GB+ RAM recommended

## 🏃‍♂️ Quick Start

### Production Mode
```bash
# Clone and navigate
git clone <repository-url>
cd TaskFlow

# Run full stack with monitoring
docker compose -f docker-compose.yml -f docker-compose.monitoring.yml up
```

### Development Mode
```bash
# Run with development profile (hot reload)
docker compose --profile dev up
```

### Basic Stack Only
```bash
# Run without monitoring
docker compose up
```

## 🌐 Service URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| **Frontend** | http://localhost:3000 | - |
| **Backend API** | http://localhost:3001 | - |
| **Grafana** | http://localhost:3004 | admin/admin123 |
| **Prometheus** | http://localhost:9090 | - |
| **AlertManager** | http://localhost:9093 | - |
| **cAdvisor** | http://localhost:8081 | - |

## 📊 Database Access

- **PostgreSQL**: `localhost:5433`
- **Redis**: `localhost:6379`

## 🏗️ Architecture

```
Frontend (React) → Backend (Node.js) → PostgreSQL
                ↓
              Redis Cache
                ↓
         Monitoring Stack
    (Prometheus + Grafana + Loki)
```

## 📁 Project Structure

```
TaskFlow/
├── frontend/          # React application
├── backend/           # Node.js API
├── monitoring/        # Monitoring configurations
├── database/          # Database scripts
└── docker-compose.yml # Container orchestration
```

## 🛠️ Development

### Local Development
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend
cd frontend && npm install && npm start
```

### Environment Variables
Copy `.env.example` to `.env` and configure:
- Database credentials
- JWT secrets
- Redis settings

## 📈 Monitoring

- **Metrics**: Prometheus scrapes application and system metrics
- **Dashboards**: Grafana provides visual monitoring
- **Logs**: Loki aggregates application and system logs
- **Alerts**: AlertManager handles notifications

## 🔧 Configuration

- **Prometheus**: `monitoring/prometheus/prometheus.yml`
- **Grafana**: Auto-provisioned datasources and dashboards
- **Loki**: Log aggregation configuration
- **AlertManager**: Alert routing rules

## 📝 API Endpoints

- `GET /health` - Health check
- `POST /api/auth/login` - User authentication
- `GET /api/tasks` - List tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
