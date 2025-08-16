# Task Management Backend (Express + MongoDB)

## Quick start (local)
1. Copy `.env.example` → `.env` and edit values.
2. Install dependencies:
```bash
npm install
```
3. Run the seed script to create sample users & tasks:
```bash
npm run seed
```
4. Start the dev server:
```bash
npm run dev
```
The server will run on `http://localhost:5000`.

## Docker (with MongoDB)
```bash
docker compose up --build
# Optional: run seed inside the container (one-off)
docker compose exec api node seed/seed.js
```
