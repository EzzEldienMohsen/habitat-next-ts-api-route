import pool from '@/db';

export const fetchWishlistByClientId = async (clientId: number) => {
  const result = await pool.query(
    'SELECT * FROM wishlist WHERE client_id = $1',
    [clientId]
  );
  return result.rowCount > 0 ? result.rows[0] : null;
};
