import {
  createAddressInDb,
  getAllAddressesFromDb,
} from '@/controllers/addresses';
import { withAuth } from '@/utils/authWrapper';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) =>
  withAuth(req, async (userId: number) => {
    const response = await getAllAddressesFromDb(userId);
    return NextResponse.json(response, { status: 200 });
  });
export const POST = (req: NextRequest) =>
  withAuth(req, async (userId) => {
    const { address_name, address_details } = await req.json();
    const response = await createAddressInDb(
      address_name,
      address_details,
      userId
    );
    return NextResponse.json(response, { status: 201 });
  });
