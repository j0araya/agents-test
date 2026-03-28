import { Schema, model, models, Document } from 'mongoose';

export interface IAttraction {
  name: string;
  description: string;
  type: string;
}

export interface IFact {
  label: string;
  value: string;
}

export interface IRegion extends Document {
  slug: string;
  name: string;
  number: string;
  capital: string;
  population: number;
  area: number;
  description: string;
  longDescription: string;
  climate: string;
  mainActivities: string[];
  attractions: IAttraction[];
  facts: IFact[];
  imageUrl: string;
  color: string;
}

const RegionSchema = new Schema<IRegion>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    number: { type: String, required: true },
    capital: { type: String, required: true },
    population: { type: Number, required: true },
    area: { type: Number, required: true },
    description: { type: String, required: true },
    longDescription: { type: String, required: true },
    climate: { type: String, required: true },
    mainActivities: [{ type: String }],
    attractions: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    facts: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    imageUrl: { type: String, default: '' },
    color: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// In Next.js, models can be re-imported across hot reloads — guard against recompilation
export const Region = models.Region || model<IRegion>('Region', RegionSchema);
