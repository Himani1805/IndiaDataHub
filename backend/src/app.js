import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dataRoutes from './routes/dataRoutes.js';
import authRoutes from './routes/authRoutes.js';

// Initialize environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Register Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1', dataRoutes);

// Health Check Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "Backend is working with ES6!",
  });
});

// IMPORTANT: You must export the app so server.js can use it
export default app;