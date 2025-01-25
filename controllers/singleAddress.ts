import pool from '@/db';
import { revalidatePath } from 'next/cache';

export const getAddressFromDb = async (clientId: number, id: number) => {
  try {
    const result = await pool.query(
      'SELECT * FROM client_address WHERE client_id = $1 AND id = $2',
      [clientId, id]
    );
    return { success: true, data: result.rows[0] };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching address:', err.message);
    throw new Error('Failed to fetch address.');
  }
};

export const updateAddressInDb = async (
  address_name: string,
  address_details: string,
  clientId: number,
  id: number
) => {
  try {
    const result = await pool.query(
      'UPDATE client_address SET address_name = $1, address_details =$2 WHERE client_id = $3 AND id = $4 RETURNING *',
      [address_name, address_details, clientId, id]
    );
    revalidatePath('/address');
    return {
      success: true,
      data: result.rows,
      message: 'address updated successfully',
    };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching address:', err.message);
    throw new Error('Failed to fetch address.');
  }
};

export const deleteAddressFromDb = async (clientId: number, id: number) => {
  try {
    const result = await pool.query(
      'DELETE FROM client_address WHERE client_id = $1 AND id = $2 RETURNING *',
      [clientId, id]
    );
    return {
      success: true,
      message: 'address deleted successfully',
      data: result.rows,
    };
  } catch (error) {
    const err = error as Error;
    console.error('Error deleting address:', err.message);
    throw new Error('Failed to deleteAddress.');
  }
};
