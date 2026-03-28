import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import regionsRouter from './routes/regions';
import prisma from './lib/prisma';

const app = express();
const PORT = process.env.PORT || 3001;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

// Health check — includes DB connectivity status
app.get('/health', async (_req, res) => {
  try {
    await (prisma as any).$queryRawUnsafe('SELECT 1');
    res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'error', db: 'disconnected', timestamp: new Date().toISOString() });
  }
});

// Routes
app.use('/api/regions', regionsRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});

export default app;
