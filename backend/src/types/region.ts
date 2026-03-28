export interface Region {
  id: string; // legacy string id from static data, not used as DB primary key
  slug: string;
  name: string;
  number: string;
  capital: string;
  population: number;
  area: number; // km²
  description: string;
  longDescription: string;
  climate: string;
  mainActivities: string[];
  attractions: Attraction[];
  facts: Fact[];
  imageUrl: string;
  color: string;
}

export interface RegionSummary {
  id: number; // auto-increment PK from Prisma
  slug: string;
  name: string;
  number: string;
  capital: string;
  population: number;
  area: number;
  description: string;
  color: string;
}

export interface Attraction {
  name: string;
  description: string;
  type: 'natural' | 'cultural' | 'historical' | 'adventure';
}

export interface Fact {
  label: string;
  value: string;
}
