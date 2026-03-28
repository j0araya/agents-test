export interface Region {
  id: string;
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

export interface Attraction {
  name: string;
  description: string;
  type: "natural" | "cultural" | "historical" | "adventure";
}

export interface Fact {
  label: string;
  value: string;
}
