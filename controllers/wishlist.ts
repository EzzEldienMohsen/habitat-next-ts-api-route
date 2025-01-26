import { CartProduct, Product } from '@/assets/types';
import pool from '@/db';
import { fetchWishlistByClientId } from '@/utils/wishlistUtils';
import { revalidatePath } from 'next/cache';

export const getAllWishlist = async (userId: number) => {
  try {
    const wishlist = await fetchWishlistByClientId(userId);
    if (!wishlist) {
      return { items: [], totalItems: 0 };
    }
    const wishlistItems = await pool.query(
      'SELECT * FROM wishlist_items WHERE wishlist_id = $1',
      [wishlist.id]
    );
    return {
      success: true,
      totalItems: wishlistItems.rowCount,
      items: wishlistItems.rows,
    };
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to get wishlist');
  }
};

export const addItemToWishlist = async (
  userId: number,
  wishlistData: Product | CartProduct
) => {
  try {
    let wishlist = await fetchWishlistByClientId(userId);
    if (!wishlist) {
      const createResult = await pool.query(
        'INSERT INTO wishlist (client_id) VALUES ($1) RETURNING *',
        [userId]
      );
      wishlist = createResult.rows[0];
    }
    const productId =
      'product_id' in wishlistData ? wishlistData.product_id : wishlistData.id;
    await pool.query(
      `INSERT INTO wishlist_items (img, name, type, price, cat, wishlist_id, product_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        wishlistData.img,
        wishlistData.name,
        wishlistData.type,
        wishlistData.price,
        wishlistData.cat,
        wishlist.id,
        productId,
      ]
    );
    revalidatePath('/', 'layout');

    return { success: true, message: 'added to wishlist' };
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw new Error('Failed to add to wishlist');
  }
};
export const clearWishlist = async (userId: number) => {
  try {
    await pool.query(`DELETE FROM wishlist WHERE client_id = $1`, [userId]);
    revalidatePath('/', 'layout');

    return { success: true, message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error clearing wishlist:', error);
    throw new Error('Failed to clear wishlist');
  }
};

export const removeItemFromWishlist = async (userId: number, id: number) => {
  try {
    const wishlist = await fetchWishlistByClientId(userId);
    if (!wishlist) {
      return {
        success: false,
        error: [{ field: 'general', message: 'Wishlist not found' }],
      };
    }
    await pool.query(
      `DELETE FROM wishlist_items WHERE id = $1 AND wishlist_id = $2`,
      [id, wishlist.id]
    );
    revalidatePath('/', 'layout');

    return { success: true, message: 'item removed successfully' };
  } catch (error) {
    console.error('Error removing item form wishlist:', error);
    throw new Error('Failed to remove item form wishlist');
  }
};
