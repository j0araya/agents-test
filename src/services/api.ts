import axios from 'axios';
import type { Region, RegionSummary } from '@/src/types/region';

// In Next.js, relative /api routes work natively — no base URL needed
const baseURL = '/api';

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
