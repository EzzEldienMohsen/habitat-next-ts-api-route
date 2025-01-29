import { verifyAuth } from '@/controllers/auth';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const withAuth = async (
  req: NextRequest,
  handler: (userId: number) => Promise<NextResponse>
): Promise<NextResponse> => {
  try {
    const cookieStore = await cookies();
    let token = cookieStore.get('auth_token')?.value;

    if (!token) {
      const authHeader = req.headers.get('Authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
      }
    }

    const authResult = await verifyAuth(token);
    if (!authResult.user) {
      return NextResponse.json(
        {
          success: false,
          message: 'unauthorized access please sign in and try again',
        },
        { status: 401 }
      );
    }

    return handler(authResult.user.id);
  } catch (error) {
    console.error('Error in authentication:', (error as Error).message);
    return NextResponse.json(
      { error: 'Authentication error.' },
      { status: 500 }
    );
  }
};
