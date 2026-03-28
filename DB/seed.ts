import 'dotenv/config';
import mongoose from 'mongoose';
import { Region } from '../backend/src/models/Region';
import { regions } from '../backend/src/data/regions';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chile_atlas';

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB:', mongoose.connection.host);

  let upserted = 0;
  for (const region of regions) {
    const { id: _id, ...doc } = region as any;
    await Region.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, new: true });
    upserted++;
  }

  console.log(`Seeded ${upserted} regions.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
