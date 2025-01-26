import {
  addItemToCart,
  clearCart,
  getAllCartItemsFromDb,
} from '@/controllers/cart';
import { withAuth } from '@/utils/authWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const result = await getAllCartItemsFromDb(userId);
    return NextResponse.json(result, { status: 200 });
  });

export const POST = (req: NextRequest) =>
  withAuth(req, async (userId) => {
    const cartData = await req.json();
    const result = await addItemToCart(userId, cartData);
    return NextResponse.json(result, { status: 201 });
  });

export const DELETE = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const result = await clearCart(userId);
    return NextResponse.json(result, { status: 202 });
  });
