import { getProductById } from '@/controllers/products';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  const id = req.url.split('/').pop();
  if (!id) {
    return NextResponse.json({ error: 'No Product Found.' }, { status: 404 });
  }

  try {
    const result = await getProductById(id);
    return NextResponse.json(result.product, { status: 200 });
  } catch (error) {
    console.error('Error in API route:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
};
