# Task Manager App

This is a full-stack Task Management web application with a **React + Vite frontend** and a **Node.js + Express backend**.  
The backend uses **MongoDB** for persistence and **JWT-based authentication**.  
The project includes a **CI/CD pipeline using GitHub Actions**, deploying the frontend to GitHub Pages and pushing the backend Docker image to Docker Hub.

---

## 🚀 Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) (local or cloud instance, e.g. MongoDB Atlas)
- [Docker](https://www.docker.com/) (for containerization)

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```
### 2. Backend Setup (Local Development)
 - cd task-manager-backend
 - npm install
 - npm run seed
 - npm run dev

### 2. Frontend Setup (Local Development)
 - cd task-manager-frontend
 - npm install
 - npm run dev

### 3. Run via Docker
 - docker-compose up --build


## API Documentation
**Base URL**
 - Local: http://localhost:5000/api
 - Docker: http://localhost:5000/api

  ### Authentication
  
  **Endpoints**
  | Endpoint         | Method | Description                 | Request Body                                                        | Response                                                     |
  | ---------------- | ------ | --------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
  | `/auth/register` | POST   | Register a new user         | `{ "username": "string", "email": "string", "password": "string" }` | `{
    "token": "jwt_token_here",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string"
    }
}`                    |
  | `/auth/login`    | POST   | Authenticate user & get JWT | `{ "email": "string", "password": "string" }`                       | `{
    "token": "jwt_token_here",
    "user": {
        "id": "string",
        "name": "string",
        "email": "string"
    }
}`                                    |
  | `/auth/me`       | GET    | Get logged-in user profile  | **Headers:** `{ "Authorization": "Bearer <token>" }`                | `{ "id": "123", "username": "john", "email": "john@example.com" }` |

  ### Tasks
  **Endpoints**
  | Method | Endpoint         | Description             | Body Example                                     |
  | ------ | ---------------- | ----------------------- | ------------------------------------------------ |
  | GET    | `/api/tasks`     | Get all tasks           | –                                                |
  | GET    | `/api/tasks/:id` | Get task by ID          | –                                                |
  | POST   | `/api/tasks`     | Create a new task       | `{ "title": "Learn React", "completed": false }` |
  | PUT    | `/api/tasks/:id` | Update a task (replace) | `{ "title": "Learn Docker", "completed": true }` |
  | PATCH  | `/api/tasks/:id` | Update partial fields   | `{ "completed": true }`                          |
  | DELETE | `/api/tasks/:id` | Delete a task           | –                                                |


## CI/CD Pipeline
  This project uses GitHub Actions for CI/CD:
  CI: Runs on every push/PR to main. Installs dependencies, builds frontend and backend.
  CD: On merge to main, it:
  - Deploys the frontend to GitHub Pages.
  - Builds & pushes backend Docker image to Docker Hub.

  Secrets used:
  - DOCKER_HUB_USERNAME
  - DOCKER_HUB_ACCESS_TOKEN
  - GH_PAT

## Assumptions & Decisions
  - JWT is used for authentication and must be included in the Authorization header for protected routes.
  - The frontend is deployed to GitHub Pages under the gh-pages branch.
  - The backend is containerized and pushed to Docker Hub, but deployment is left to the user’s infra (Kubernetes, Docker Compose, etc.).
  - MongoDB must be running locally or accessible remotely (Atlas).
