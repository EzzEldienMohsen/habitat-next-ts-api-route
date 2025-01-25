import pool from '@/db';
import { generateToken } from '@/utils/jwtUtils';

// signing up
export const addUser = async (
  f_name: string,
  l_name: string,
  email: string,
  phone: string,
  password: string
) => {
  try {
    const insertResult = await pool.query(
      'INSERT INTO clientUser (f_name,l_name,email,phone,password) VALUES ($1,$2,$3,$4,$5) RETURNING id',
      [f_name, l_name, email, phone, password]
    );
    const id = insertResult.rows[0].id;
    const token = generateToken(Number(id));
    const result = await pool.query(
      'UPDATE clientUser SET token=$2 WHERE id=$1 RETURNING token',
      [id, token]
    );
    return {
      success: true,
      message: 'signed up successfully',
      token: result.rows[0].token,
    };
  } catch (error) {
    console.error('Database Error:', error);
    return {
      error: [
        {
          field: 'form',
          message: 'Something went wrong. Please try again.',
        },
      ],
    };
  }
};
