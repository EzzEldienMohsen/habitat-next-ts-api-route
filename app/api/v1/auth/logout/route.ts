import { clientLogout } from '@/controllers/auth';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const response = await clientLogout();
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error('Error in API route:', (error as Error).message);
    return NextResponse.json(
      {
        error: [
          {
            field: 'form',
            message: 'Failed to process the request. Please try again later.',
          },
        ],
      },
      { status: 500 }
    );
  }
};
