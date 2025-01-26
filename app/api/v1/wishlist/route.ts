import {
  addItemToWishlist,
  clearWishlist,
  getAllWishlist,
} from '@/controllers/wishlist';
import { withAuth } from '@/utils/authWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const result = await getAllWishlist(userId);
    return NextResponse.json(result, { status: 200 });
  });

export const POST = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const wishlistData = await req.json();
    const result = await addItemToWishlist(userId, wishlistData);
    return NextResponse.json(result, { status: 201 });
  });
export const DELETE = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const result = await clearWishlist(userId);
    return NextResponse.json(result, { status: 202 });
  });
