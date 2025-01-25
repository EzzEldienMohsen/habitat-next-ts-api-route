import { verifyAuth } from '@/controllers/auth';
import { NextRequest, NextResponse } from 'next/server';

export const withAuth = async (
  req: NextRequest,
  handler: (userId: number) => Promise<NextResponse>
): Promise<NextResponse> => {
  try {
    let token = req.cookies.get('auth_token')?.value;
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
          error: [
            {
              field: 'auth',
              message: 'Unauthorized',
            },
          ],
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
