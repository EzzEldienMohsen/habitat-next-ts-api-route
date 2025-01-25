import {
  deleteAddressFromDb,
  getAddressFromDb,
  updateAddressInDb,
} from '@/controllers/singleAddress';
import { withAuth } from '@/utils/authWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const id = Number(req.url.split('/').pop());
    const result = await getAddressFromDb(userId, id);
    return NextResponse.json(result, { status: 200 });
  });

export const PATCH = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const { address_name, address_details, id } = await req.json();
    const result = await updateAddressInDb(
      address_name,
      address_details,
      userId,
      id
    );
    return NextResponse.json(result, { status: 200 });
  });

export const DELETE = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const { id } = await req.json();
    const result = await deleteAddressFromDb(userId, id);
    return NextResponse.json(result, { status: 200 });
  });
