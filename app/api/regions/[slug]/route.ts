import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/src/lib/db';
import { Region } from '@/src/models/Region';

export const runtime = 'nodejs';

// GET /api/regions/:slug — return full region detail
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();
    const { slug } = await params;
    const region = await Region.findOne({ slug }, { _id: 0, __v: 0 });
    if (!region) {
      return NextResponse.json(
        { error: `Region '${slug}' not found` },
        { status: 404 }
      );
    }
    return NextResponse.json(region);
  } catch (err) {
    console.error('Error fetching region:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
