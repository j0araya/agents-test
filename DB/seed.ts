import 'dotenv/config';
// All imports resolved from backend/node_modules — schema lives in DB/, client generated in backend/
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('../backend/node_modules/.prisma/client');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaPg } = require('../backend/node_modules/@prisma/adapter-pg');
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pg = require('../backend/node_modules/pg');
import { regions } from '../backend/src/data/regions';

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding database with', regions.length, 'regions...');

  for (const region of regions) {
    await prisma.region.upsert({
      where: { slug: region.slug },
      update: {
        name: region.name,
        number: region.number,
        capital: region.capital,
        population: region.population,
        area: region.area,
        description: region.description,
        longDescription: region.longDescription,
        climate: region.climate,
        mainActivities: region.mainActivities,
        attractions: region.attractions as any,
        facts: region.facts as any,
        imageUrl: region.imageUrl,
        color: region.color,
      },
      create: {
        slug: region.slug,
        name: region.name,
        number: region.number,
        capital: region.capital,
        population: region.population,
        area: region.area,
        description: region.description,
        longDescription: region.longDescription,
        climate: region.climate,
        mainActivities: region.mainActivities,
        attractions: region.attractions as any,
        facts: region.facts as any,
        imageUrl: region.imageUrl,
        color: region.color,
      },
    });
    console.log(`  ✓ Upserted: ${region.name}`);
  }

  console.log('Seed complete.');
  await prisma.$disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
