import axios from 'axios';
import type { Region, RegionSummary } from '../types/region';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
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
