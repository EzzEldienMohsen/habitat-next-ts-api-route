import { CartProduct } from '@/assets/types';
import pool from '@/db';

// Fetch cart by client ID
export const fetchCartByClientId = async (clientId: number) => {
  const result = await pool.query('SELECT * FROM cart WHERE client_id = $1', [
    clientId,
  ]);
  return result.rowCount > 0 ? result.rows[0] : null;
};

// Fetch cart items by cart ID
export const fetchCartItems = async (cartId: number) => {
  const result = await pool.query(
    'SELECT * FROM cart_products WHERE cart_id = $1',
    [cartId]
  );
  return result.rows;
};

// Calculate cart totals
export const calculateCartTotals = (
  cartItems: CartProduct[],
  taxRate: number
) => {
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.amount,
    0
  );
  const taxes = subTotal * taxRate;
  const totalPrice = subTotal + taxes;

  return { subTotal, taxes, totalPrice };
};
