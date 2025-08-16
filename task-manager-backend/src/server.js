import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

const app = express();

// Security & basics
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Routes
app.get('/', (_req, res) => res.json({ status: 'ok', service: 'task-api' }));
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Errors
app.use(notFound);
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 5000;
await connectDB(process.env.MONGO_URI);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
