import { ClientUser } from '@/assets/types';
import pool from '@/db';
import { revalidatePath } from 'next/cache';

export const gettingProfileFromDb = async (id: number) => {
  try {
    const result = await pool.query('SELECT * FROM clientUser WHERE id = $1', [
      id,
    ]);
    return { success: true, data: result.rows[0] };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching products:', err.message);
    throw new Error('Failed to fetch products.');
  }
};

export const updateProfileDb = async (id: number, data: ClientUser) => {
  try {
    const result = await pool.query(
      'UPDATE clientUser SET f_name = $2, l_name = $3, email = $4, phone = $5, main_address = $6, gender = $7, date_of_birth = $8,  nationality = $9, avatar_url = $10, bio = $11 WHERE id = $1',
      [
        id,
        data.f_name,
        data.l_name,
        data.email,
        data.phone,
        data.main_address || null,
        data.gender || null,
        data.date_of_birth || null,
        data.nationality || null,
        data.avatar_url || null,
        data.bio || null,
      ]
    );

    return {
      success: true,
      data: result.rows[0],
      message: 'Profile updated successfully',
    };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching products:', err.message);
    throw new Error('Failed to fetch products.');
  }
};

export const deleteProfileFromDb = async (id: number) => {
  try {
    const result = await pool.query('DELETE FROM clientUser WHERE id = $1', [
      id,
    ]);
    revalidatePath('/', 'layout');
    return { success: true, message: 'profile deleted successfully' };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching products:', err.message);
    throw new Error('Failed to fetch products.');
  }
};
