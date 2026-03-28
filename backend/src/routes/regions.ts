import { Router, Request, Response } from 'express';
import { regions } from '../data/regions';

const router = Router();

// GET /api/regions — return all regions (summary)
router.get('/', (_req: Request, res: Response) => {
  const summary = regions.map(({ id, slug, name, number, capital, population, area, description, color }) => ({
    id,
    slug,
    name,
    number,
    capital,
    population,
    area,
    description,
    color,
  }));
  res.json(summary);
});

// GET /api/regions/:slug — return full region detail
router.get('/:slug', (req: Request, res: Response) => {
  const region = regions.find((r) => r.slug === req.params.slug);
  if (!region) {
    res.status(404).json({ error: `Region '${req.params.slug}' not found` });
    return;
  }
  res.json(region);
});

export default router;
