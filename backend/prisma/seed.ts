import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import { regions } from '../src/data/regions';

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter } as any);

  console.log('Seeding database with', regions.length, 'regions...');

  for (const region of regions) {
    await (prisma as any).region.upsert({
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
  await (prisma as any).$disconnect();
  await pool.end();
}

main().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
