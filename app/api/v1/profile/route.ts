import { withAuth } from '@/utils/authWrapper';
import {
  deleteProfileFromDb,
  gettingProfileFromDb,
  updateProfileDb,
} from '@/controllers/profile';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest) =>
  withAuth(req, async (userId) => {
    const response = await gettingProfileFromDb(userId);
    return NextResponse.json(response, { status: 200 });
  });

export const PATCH = (req: NextRequest) =>
  withAuth(req, async (userId) => {
    const data = await req.json();
    const response = await updateProfileDb(userId, data);
    return NextResponse.json(response, { status: 200 });
  });

export const DELETE = (req: NextRequest) =>
  withAuth(req, async (userId) => {
    await deleteProfileFromDb(userId);
    return NextResponse.json({}, { status: 202 });
  });
