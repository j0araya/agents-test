import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { connectDB } from './lib/db';
import regionsRouter from './routes/regions';

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health check — includes MongoDB connectivity state
app.get('/health', (_req, res) => {
  const state = mongoose.connection.readyState;
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  const db = state === 1 ? 'connected' : 'disconnected';
  const status = state === 1 ? 'ok' : 'error';
  res.status(state === 1 ? 200 : 503).json({ status, db, timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/regions', regionsRouter);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

export default app;
