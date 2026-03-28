/**
 * Script: update-image-urls.ts
 * Updates the imageUrl field for all 16 Chilean regions in MongoDB.
 * Images sourced from Unsplash (free to use under Unsplash License).
 *
 * Run with: MONGODB_URI="..." npx tsx scripts/update-image-urls.ts
 */

import mongoose from 'mongoose';
import { Region } from '../src/models/Region';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/chile_atlas';

// Unsplash landscape photos — free to use, high quality, verified 200
// Format: https://images.unsplash.com/photo-{ID}?w=1280&q=80&fit=crop&auto=format
const IMAGE_URLS: Record<string, string> = {
  // Arica y Parinacota — altiplano andino, desierto costero
  'arica-y-parinacota':
    'https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=1280&q=80&fit=crop&auto=format',

  // Tarapacá — desierto de Atacama, geoglifos
  tarapaca:
    'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=1280&q=80&fit=crop&auto=format',

  // Antofagasta — Valle de la Luna, costa del Pacífico
  antofagasta:
    'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1280&q=80&fit=crop&auto=format',

  // Atacama — desierto, salares, flores
  atacama:
    'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1280&q=80&fit=crop&auto=format',

  // Coquimbo — Valle del Elqui, costa
  coquimbo:
    'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1280&q=80&fit=crop&auto=format',

  // Valparaíso — cerros coloridos, puerto
  valparaiso:
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1280&q=80&fit=crop&auto=format',

  // Metropolitana — Santiago, Andes
  metropolitana:
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1280&q=80&fit=crop&auto=format',

  // O'Higgins — cordillera, valle central
  "o'higgins":
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1280&q=80&fit=crop&auto=format',

  // Maule — viñedos, río Maule
  maule:
    'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=1280&q=80&fit=crop&auto=format',

  // Ñuble — precordillera, volcanes
  nuble:
    'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=1280&q=80&fit=crop&auto=format',

  // Biobío — lago Laja, costa
  biobio:
    'https://images.unsplash.com/photo-1602088113235-229c19758e9f?w=1280&q=80&fit=crop&auto=format',

  // Araucanía — lago Villarrica, volcán, araucarias
  araucania:
    'https://images.unsplash.com/photo-1605722243979-fe0be8158232?w=1280&q=80&fit=crop&auto=format',

  // Los Ríos — Valdivia, selva valdiviana
  'los-rios':
    'https://images.unsplash.com/photo-1605462863863-10d9e47e15ee?w=1280&q=80&fit=crop&auto=format',

  // Los Lagos — lagos, volcanes, Chiloé
  'los-lagos':
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1280&q=80&fit=crop&auto=format',

  // Aysén — Carretera Austral, glaciares, fiordos
  aysen:
    'https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=1280&q=80&fit=crop&auto=format',

  // Magallanes — Torres del Paine, Patagonia
  magallanes:
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1280&q=80&fit=crop&auto=format',
};

async function run() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const [slug, imageUrl] of Object.entries(IMAGE_URLS)) {
    const result = await Region.updateOne({ slug }, { $set: { imageUrl } });
    console.log(`${slug}: matched=${result.matchedCount} modified=${result.modifiedCount}`);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
