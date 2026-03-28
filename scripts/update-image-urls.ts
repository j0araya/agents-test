/**
 * Script: update-image-urls.ts
 * Updates the imageUrl field for all 16 Chilean regions in MongoDB.
 * Images sourced from Wikimedia Commons (public domain).
 *
 * Run with: npx tsx scripts/update-image-urls.ts
 */

import mongoose from 'mongoose';
import { Region } from '../src/models/Region';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/chile_atlas';

// Wikimedia Commons landscape photos — public domain, high quality
const IMAGE_URLS: Record<string, string> = {
  'arica-y-parinacota':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Lauca_National_Park_-_Chile.jpg/1280px-Lauca_National_Park_-_Chile.jpg',
  tarapaca:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Geoglyphs_of_Pintados.jpg/1280px-Geoglyphs_of_Pintados.jpg',
  antofagasta:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Valle_de_la_Luna_-_Atacama.jpg/1280px-Valle_de_la_Luna_-_Atacama.jpg',
  atacama:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Atacama_salt_flat.jpg/1280px-Atacama_salt_flat.jpg',
  coquimbo:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Valle_del_Elqui.jpg/1280px-Valle_del_Elqui.jpg',
  valparaiso:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Valpara%C3%ADso_desde_el_mar.jpg/1280px-Valpara%C3%ADso_desde_el_mar.jpg',
  metropolitana:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Santiago_de_Chile_-_panoramio.jpg/1280px-Santiago_de_Chile_-_panoramio.jpg',
  "o'higgins":
    'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Rancagua_-_Mina_El_Teniente.jpg/1280px-Rancagua_-_Mina_El_Teniente.jpg',
  maule:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Lago_Colbun_Chile.jpg/1280px-Lago_Colbun_Chile.jpg',
  nuble:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Chillan_viejo_plaza.jpg/1280px-Chillan_viejo_plaza.jpg',
  biobio:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Laguna_del_Laja.jpg/1280px-Laguna_del_Laja.jpg',
  araucania:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Lago_Villarrica_y_volcan.jpg/1280px-Lago_Villarrica_y_volcan.jpg',
  'los-rios':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Valdivia_rio_calle_calle.jpg/1280px-Valdivia_rio_calle_calle.jpg',
  'los-lagos':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Puerto_Montt_bay.jpg/1280px-Puerto_Montt_bay.jpg',
  aysen:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Carretera_Austral_Aysen.jpg/1280px-Carretera_Austral_Aysen.jpg',
  magallanes:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Torres_del_Paine_Chile.jpg/1280px-Torres_del_Paine_Chile.jpg',
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
