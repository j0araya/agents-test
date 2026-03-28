import axios from 'axios';
import type { Region, RegionSummary } from '../types/region';

// VITE_API_URL=http://localhost:3001 in dev, empty string in prod (nginx proxies /api)
const baseURL = `${import.meta.env.VITE_API_URL ?? ''}/api`;

const api = axios.create({
  baseURL,
  timeout: 8000,
});

export async function getRegions(): Promise<RegionSummary[]> {
  const { data } = await api.get<RegionSummary[]>('/regions');
  return data;
}

export async function getRegion(slug: string): Promise<Region> {
  const { data } = await api.get<Region>(`/regions/${slug}`);
  return data;
}
