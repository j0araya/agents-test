import aricaRaw from '../assets/regions/arica-y-parinacota.svg?raw';
import tarapacaRaw from '../assets/regions/tarapaca.svg?raw';
import antofagastaRaw from '../assets/regions/antofagasta.svg?raw';
import atacamaRaw from '../assets/regions/atacama.svg?raw';
import coquimboRaw from '../assets/regions/coquimbo.svg?raw';
import valparaisoRaw from '../assets/regions/valparaiso.svg?raw';
import metropolitanaRaw from '../assets/regions/metropolitana.svg?raw';
import ohigginsRaw from '../assets/regions/ohiggins.svg?raw';
import mauleRaw from '../assets/regions/maule.svg?raw';
import nubleRaw from '../assets/regions/nuble.svg?raw';
import biobioRaw from '../assets/regions/biobio.svg?raw';
import araucaniaRaw from '../assets/regions/araucania.svg?raw';
import losRiosRaw from '../assets/regions/los-rios.svg?raw';
import losLagosRaw from '../assets/regions/los-lagos.svg?raw';
import aysenRaw from '../assets/regions/aysen.svg?raw';
import magallanesRaw from '../assets/regions/magallanes.svg?raw';

function extractPathD(svgRaw: string): string {
  const match = svgRaw.match(/<path\s+[^>]*d="([^"]+)"/i);
  return match ? match[1] : '';
}

export const REGION_PATHS: Record<string, string> = {
  'arica-y-parinacota': extractPathD(aricaRaw),
  tarapaca: extractPathD(tarapacaRaw),
  antofagasta: extractPathD(antofagastaRaw),
  atacama: extractPathD(atacamaRaw),
  coquimbo: extractPathD(coquimboRaw),
  valparaiso: extractPathD(valparaisoRaw),
  metropolitana: extractPathD(metropolitanaRaw),
  "o'higgins": extractPathD(ohigginsRaw),
  maule: extractPathD(mauleRaw),
  nuble: extractPathD(nubleRaw),
  biobio: extractPathD(biobioRaw),
  araucania: extractPathD(araucaniaRaw),
  'los-rios': extractPathD(losRiosRaw),
  'los-lagos': extractPathD(losLagosRaw),
  aysen: extractPathD(aysenRaw),
  magallanes: extractPathD(magallanesRaw),
};
