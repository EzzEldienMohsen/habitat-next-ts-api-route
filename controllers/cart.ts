import { CartProduct, ProductToAddToCart } from '@/assets/types';
import pool from '@/db';
import { revalidatePath } from 'next/cache';
import {
  fetchCartByClientId,
  fetchCartItems,
  calculateCartTotals,
} from '@/utils/cartUtils';

// Get all cart items
export const getAllCartItemsFromDb = async (id: number) => {
  try {
    const cart = await fetchCartByClientId(id);

    if (!cart) {
      return {
        success: true,
        data: {
          items: [],
          totalPrice: 0,
          totalItems: 0,
          taxes: 0,
          cartId: 0,
          subTotal: 0,
        },
      };
    }

    const cartItems = await fetchCartItems(cart.id);
    const totalItems = cartItems.length;
    const { subTotal, taxes, totalPrice } = calculateCartTotals(
      cartItems,
      cart.taxes
    );

    const data = {
      items: cartItems,
      totalPrice,
      totalItems,
      taxes: cart.taxes,
      cartId: cart.id,
      subTotal,
    };

    return { success: true, data };
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to get cart');
  }
};

// Add item to cart
export const addItemToCart = async (
  id: number,
  cartData: ProductToAddToCart
) => {
  try {
    let cart = await fetchCartByClientId(id);

    if (!cart) {
      const cartCreation = await pool.query(
        'INSERT INTO cart (client_id) VALUES ($1) RETURNING *',
        [id]
      );
      cart = cartCreation.rows[0];
    }

    await pool.query(
      'INSERT INTO cart_products (img, name, type, price, cat, cart_id, product_id, amount) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
      [
        cartData.img,
        cartData.name,
        cartData.type,
        cartData.price,
        cartData.cat,
        cart.id,
        cartData.id,
        cartData.amount,
      ]
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
    return { success: true, message: 'Item added to cart' };
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Failed to add to cart');
  }
};

// Clear cart
export const clearCart = async (id: number) => {
  try {
    await pool.query('DELETE FROM cart WHERE client_id = $1 RETURNING *', [id]);
    revalidatePath('/', 'layout');
    return { success: true, message: 'Cart cleared successfully' };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
};
