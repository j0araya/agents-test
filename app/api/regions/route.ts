import { NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { Region } from '@/src/models/Region';

export const runtime = 'nodejs';

// GET /api/regions — return all regions (summary fields only)
export async function GET() {
  try {
    await connectDB();
    const regions = await Region.find(
      {},
      {
        slug: 1,
        name: 1,
        number: 1,
        capital: 1,
        population: 1,
        area: 1,
        description: 1,
        color: 1,
        _id: 0,
      }
    ).sort({ number: 1 });
    return NextResponse.json(regions);
  } catch (err) {
    console.error('Error fetching regions:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
