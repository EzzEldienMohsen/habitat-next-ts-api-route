'use server';

import { CartProduct, Product } from '@/assets/types';
import { autoFetch } from '@/utils';

export const getWishList = async (authToken: string | undefined) => {
  try {
    const response = await autoFetch('/wishlist', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to get wishlist');
  }
};

export const addToWishlist = async (
  authToken: string | undefined,
  wishlistData: Product | CartProduct
) => {
  try {
    const response = await autoFetch.post('/wishlist', wishlistData, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding wishlist:', error);
    throw new Error('Failed to add to wishlist');
  }
};

export const clearWishList = async (authToken: string | undefined) => {
  try {
    const response = await autoFetch.delete('/wishlist', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    throw new Error('Failed to delete wishlist');
  }
};
export const removeWishlistItem = async (
  authToken: string | undefined,
  id: number
) => {
  try {
    const response = await autoFetch.delete(`/wishlist/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting wishlist:', error);
    throw new Error('Failed to delete wishlist');
  }
};
