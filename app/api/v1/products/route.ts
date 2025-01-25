import { getProducts } from '@/controllers/products';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get('limit') || '8', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const category = searchParams.get('category') || undefined;
    const latest = searchParams.get('latest') === 'true';

    const result = await getProducts({ limit, offset, category, latest });
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
};
