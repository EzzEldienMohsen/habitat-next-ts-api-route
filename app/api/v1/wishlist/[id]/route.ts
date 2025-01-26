import { removeItemFromWishlist } from '@/controllers/wishlist';
import { withAuth } from '@/utils/authWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const id = Number(req.url.split('/').pop());
    const result = await removeItemFromWishlist(userId, id);
    return NextResponse.json(result, { status: 202 });
  });
