import { CartProduct, ProductToAddToCart } from '@/assets/types';
import pool from '@/db';
import { revalidatePath } from 'next/cache';
import {
  fetchCartByClientId,
  fetchCartItems,
  calculateCartTotals,
} from '@/utils/cartUtils';

// Update cart item
export const updateCartItemInDb = async (
  userId: number,
  id: number,
  newAmount: number
) => {
  try {
    const cart = await fetchCartByClientId(userId);

    if (!cart) {
      return {
        success: false,
        error: [{ field: 'general', message: 'Cart not found' }],
      };
    }

    if (newAmount <= 0) {
      return removeItemFromCart(userId, id);
    }

    await pool.query(
      'UPDATE cart_products SET amount = $1 WHERE id = $2 AND cart_id = $3',
      [newAmount, id, cart.id]
    );

    const cartItems = await fetchCartItems(cart.id);
    const { subTotal, taxes, totalPrice } = calculateCartTotals(
      cartItems,
      cart.taxes
    );

    await pool.query(
      'UPDATE cart SET sub_total = $1, total_price = $2 WHERE id = $3',
      [subTotal, totalPrice, cart.id]
    );

    revalidatePath('/', 'layout');
    return { success: true, message: 'Item updated in the cart' };
  } catch (error) {
    console.error('Error updating item:', error);
    throw new Error('Failed to update item');
  }
};

// Remove cart item
export const removeItemFromCart = async (userId: number, id: number) => {
  try {
    const cart = await fetchCartByClientId(userId);

    if (!cart) {
      return {
        success: false,
        error: [{ field: 'general', message: 'Cart not found' }],
      };
    }

    await pool.query(
      'DELETE FROM cart_products WHERE id = $1 AND cart_id = $2',
      [id, cart.id]
    );

    const cartItems = await fetchCartItems(cart.id);
    const { subTotal, taxes, totalPrice } = calculateCartTotals(
      cartItems,
      cart.taxes
    );

    await pool.query(
      'UPDATE cart SET sub_total = $1, total_price = $2 WHERE id = $3',
      [subTotal, totalPrice, cart.id]
    );

    revalidatePath('/', 'layout');
    return { success: true, message: 'Item removed from cart' };
  } catch (error) {
    console.error('Error removing item:', error);
    throw new Error('Failed to remove item');
  }
};
