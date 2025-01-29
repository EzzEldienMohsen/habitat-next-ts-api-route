import pool from '@/db';
import { hashUserPassword, verifyPassword } from '@/utils/hash';
import { generateToken, verifyToken } from '@/utils/jwtUtils';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// signing up
export const addUser = async (
  f_name: string,
  l_name: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    const hashedPassword = hashUserPassword(password);

    const insertResult = await pool.query(
      'INSERT INTO clientUser (f_name,l_name,email,phone,password) VALUES ($1,$2,$3,$4,$5) RETURNING id',
      [f_name, l_name, email, phone, hashedPassword]
    );
    const id = insertResult.rows[0].id;
    const token = generateToken(Number(id));
    const result = await pool.query(
      'UPDATE clientUser SET token=$2 WHERE id=$1 RETURNING token',
      [id, token]
    );

    const theCookies = await cookies();
    theCookies.set('auth_token', token, {
      httpOnly: true, // Ensure it's not accessible from the client-side
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      path: '/', // Cookie is available site-wide
      maxAge: 60 * 60 * 24, // Set expiration (e.g., 1 day)
      sameSite: 'none',
    });
    return {
      success: true,
      message: 'signed up successfully',
      token: result.rows[0].token,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { success: false, message: 'error happened try again latter' },
      { status: 500 }
    );
  }
};

// log in controller
export const checkUser = async (email: string, password: string) => {
  try {
    const loggingResult = await pool.query(
      'SELECT * FROM clientUser WHERE email =$1',
      [email]
    );
    const user = loggingResult.rows[0];
    if (!user || !verifyPassword(user.password, password)) {
      return NextResponse.json(
        { success: false, message: 'unauthenticated' },
        { status: 401 }
      );
    }

    const token = generateToken(user.id);
    const result = await pool.query(
      'UPDATE clientUser SET token=$2 WHERE id=$1 RETURNING token',
      [user.id, token]
    );
    const theCookies = await cookies();
    theCookies.set('auth_token', token, {
      httpOnly: true, // Ensure it's not accessible from the client-side
      secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      path: '/', // Cookie is available site-wide
      maxAge: 60 * 60 * 24, // Set expiration (e.g., 1 day)
      sameSite: 'none',
    });
    return {
      success: true,
      message: 'signed in successfully',
      token: result.rows[0].token,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { success: false, message: 'error happened try again latter' },
      { status: 500 }
    );
  }
};

export const verifyAuth = async (token: string | null | undefined) => {
  if (!token) return { user: null };

  const decoded = verifyToken(token);
  if (!decoded) return { user: null };

  // Fetch the user from the database
  const userResult = await pool.query('SELECT * FROM clientUser WHERE id =$1', [
    decoded.userId,
  ]);
  const user = userResult.rows[0];
  return { user: user || null };
};

// Checking Auth
export const checkAuth = async (): Promise<{ isSignedIn: boolean }> => {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;

  if (!token) {
    return { isSignedIn: false };
  }

  // Call your `verifyAuth` function
  const result = await verifyAuth(token);
  return { isSignedIn: !!result.user };
};

// Client Log out
export const clientLogout = async () => {
  const theCookies = await cookies();
  theCookies.set('auth_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0, // Expire immediately
    sameSite: 'none',
  });
  revalidatePath('/', 'layout');

  return { success: true, message: 'logged out successfully' };
};
