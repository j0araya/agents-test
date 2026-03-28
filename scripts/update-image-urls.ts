/**
 * Script: update-image-urls.ts
 * Updates the imageUrl field for all 16 Chilean regions in MongoDB.
 * Images sourced from Wikimedia Commons (CC licensed, panoramic, high quality).
 *
 * Run with: MONGODB_URI="..." npx tsx scripts/update-image-urls.ts
 */

import mongoose from 'mongoose';
import { Region } from '../src/models/Region';

const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/chile_atlas';

// Wikimedia Commons — CC licensed, panoramic, high quality, verified 200
// All images are landscape orientation and show iconic regional landscapes
const IMAGE_URLS: Record<string, string> = {
  // Arica y Parinacota — Lago Chungará con volcán Parinacota (altiplano, 4500 msnm)
  'arica-y-parinacota':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Lago_Chungar%C3%A1_y_Volc%C3%A1n_Parinacota.JPG/1280px-Lago_Chungar%C3%A1_y_Volc%C3%A1n_Parinacota.JPG',

  // Tarapacá — Panorama de Iquique desde las dunas
  tarapaca:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Vista_de_Iquique%2C_Chile%2C_2016-02-11%2C_DD_01-06_PAN.JPG/1280px-Vista_de_Iquique%2C_Chile%2C_2016-02-11%2C_DD_01-06_PAN.JPG',

  // Antofagasta — Valle de la Luna, San Pedro de Atacama (360° panorama)
  antofagasta:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/360%C2%B0_Panorama_Valle_de_la_Luna_Atacama_Chile.jpg/1280px-360%C2%B0_Panorama_Valle_de_la_Luna_Atacama_Chile.jpg',

  // Atacama — Flamingos en el Salar de Atacama
  atacama:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Flamingos_at_Salar_de_Atacama.jpg/1280px-Flamingos_at_Salar_de_Atacama.jpg',

  // Coquimbo — Valle del Elqui, Pisco Elqui panorama
  coquimbo:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Pisco_elqui_pano2.jpg/1280px-Pisco_elqui_pano2.jpg',

  // Valparaíso — Cerros coloridos del puerto histórico
  valparaiso:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/On_the_Hill%2C_Valpara%C3%ADso_%28Valparaiso%29%2C_Chile_%283927311373%29.jpg/1280px-On_the_Hill%2C_Valpara%C3%ADso_%28Valparaiso%29%2C_Chile_%283927311373%29.jpg',

  // Metropolitana — Panorama de Santiago con la Cordillera de los Andes
  metropolitana:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Panorama_of_the_Andes_mountains_and_Santiago%2C_Chile_-_panoramio.jpg/1280px-Panorama_of_the_Andes_mountains_and_Santiago%2C_Chile_-_panoramio.jpg',

  // O'Higgins — Valle de Colchagua, viñedos y cordillera
  "o'higgins":
    'https://upload.wikimedia.org/wikipedia/commons/6/68/20120209Valle_de_Colchagua.jpg',

  // Maule — Laguna del Maule, volcán y agua azul
  maule:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/LAGUNA_MAULE.jpg/1280px-LAGUNA_MAULE.jpg',

  // Ñuble — Nevados de Chillán desde el noroeste
  nuble:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Nevados-de-chillan-from-the-nw-chile-bio-bio-region.jpg/1280px-Nevados-de-chillan-from-the-nw-chile-bio-bio-region.jpg',

  // Biobío — Laguna del Laja con Sierra Velluda al fondo
  biobio:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Laguna_del_Laja%2C_Sierra_Velluda%2C_Bio_Bio%2C_Chile.jpg/1280px-Laguna_del_Laja%2C_Sierra_Velluda%2C_Bio_Bio%2C_Chile.jpg',

  // Araucanía — Villarrica: pueblo, lago y volcán (banner panorámico)
  araucania:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Villarrica_Chile_Wikivoyage_banner.jpg/1280px-Villarrica_Chile_Wikivoyage_banner.jpg',

  // Los Ríos — Panorama del río Valdivia y la ciudad
  'los-rios':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/PanoramaValdivia_-_Flickr_-_rgamper.jpg/1280px-PanoramaValdivia_-_Flickr_-_rgamper.jpg',

  // Los Lagos — Volcán Osorno y Lago Llanquihue desde Los Riscos
  'los-lagos':
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Volc%C3%A1n_Osorno_y_lago_Llanquihue_desde_el_sector_Los_Riscos.jpg/1280px-Volc%C3%A1n_Osorno_y_lago_Llanquihue_desde_el_sector_Los_Riscos.jpg',

  // Aysén — Panorama Carretera Austral, Cerro Castillo
  aysen:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Panorama_Carretera_Austral_Cerro_Castillo_%28141195183%29.jpeg/1280px-Panorama_Carretera_Austral_Cerro_Castillo_%28141195183%29.jpeg',

  // Magallanes — Torres del Paine panorama near Grey Glacier
  magallanes:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Torres_del_Paine_panorama_near_Grey_Glacier.JPG/1280px-Torres_del_Paine_panorama_near_Grey_Glacier.JPG',
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
