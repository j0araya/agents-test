import { Router, Request, Response } from 'express';
import prisma from '../lib/prisma';

const router = Router();

// GET /api/regions — return all regions (summary only, omit heavy fields)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const regions = await (prisma as any).region.findMany({
      select: {
        id: true,
        slug: true,
        name: true,
        number: true,
        capital: true,
        population: true,
        area: true,
        description: true,
        color: true,
      },
      orderBy: { id: 'asc' },
    });
    res.json(regions);
  } catch (err) {
    console.error('Error fetching regions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/regions/:slug — return full region detail
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const region = await (prisma as any).region.findUnique({
      where: { slug: req.params.slug },
    });
    if (!region) {
      res.status(404).json({ error: `Region '${req.params.slug}' not found` });
      return;
    }
    res.json(region);
  } catch (err) {
    console.error('Error fetching region:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
