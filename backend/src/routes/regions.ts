import { Router, Request, Response } from 'express';
import { Region } from '../models/Region';

const router = Router();

// GET /api/regions — return all regions (summary fields only)
router.get('/', async (_req: Request, res: Response) => {
  try {
    const regions = await Region.find(
      {},
      {
        slug: 1,
        name: 1,
        number: 1,
        capital: 1,
        population: 1,
        area: 1,
        description: 1,
        color: 1,
        _id: 0,
      }
    ).sort({ number: 1 });
    res.json(regions);
  } catch (err) {
    console.error('Error fetching regions:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/regions/:slug — return full region detail
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const region = await Region.findOne({ slug: req.params.slug }, { _id: 0, __v: 0 });
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
