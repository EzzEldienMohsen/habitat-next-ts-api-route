'use server';
import { ProductToAddToCart } from '@/assets/types';
import { autoFetch } from '@/utils';

export const getAllCartItems = async (authToken?: string) => {
  try {
    const response = await autoFetch('/cart', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to get cart');
  }
};

export const addToCart = async (
  cartData: ProductToAddToCart,
  authToken?: string
) => {
  try {
    const response = await autoFetch.post('/cart', cartData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw new Error('Failed to add to cart');
  }
};

export const clearCart = async (authToken?: string) => {
  try {
    const response = await autoFetch.delete('/cart', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw new Error('Failed to delete the cart');
  }
};
