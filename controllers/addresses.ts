import pool from '@/db';

export const getAllAddressesFromDb = async (id: number) => {
  try {
    const result = await pool.query(
      'SELECT * FROM client_address WHERE client_id = $1',
      [id]
    );
    return { success: true, data: result.rows };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching addresses:', err.message);
    throw new Error('Failed to fetch addresses.');
  }
};

export const createAddressInDb = async (
  address_name: string,
  address_details: string,
  id: number
) => {
  try {
    const result = await pool.query(
      'INSERT INTO client_address (address_name,address_details,client_id) VALUES ($1,$2,$3) Returning *',
      [address_name, address_details, id]
    );
    return {
      success: true,
      message: 'address added successfully',
      data: result.rows,
    };
  } catch (error) {
    const err = error as Error;
    console.error('Error adding address:', err.message);
    throw new Error('Failed to add address.');
  }
};
