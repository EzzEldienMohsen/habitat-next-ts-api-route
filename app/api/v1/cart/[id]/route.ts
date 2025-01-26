import { removeItemFromCart, updateCartItemInDb } from '@/controllers/cartItem';
import { withAuth } from '@/utils/authWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const PATCH = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const id = Number(req.url.split('/').pop());
    const { newAmount } = await req.json();
    const result = await updateCartItemInDb(userId, id, newAmount);
    return NextResponse.json(result, { status: 201 });
  });

export const DELETE = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const id = Number(req.url.split('/').pop());
    const result = await removeItemFromCart(userId, id);
    return NextResponse.json(result, { status: 201 });
  });
