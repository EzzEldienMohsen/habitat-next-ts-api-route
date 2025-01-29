'use server';

import { CartProduct, Product } from '@/assets/types';
import { autoFetch } from '@/utils';

export const getWishList = async (authToken?: string) => {
  try {
    const response = await autoFetch('/wishlist', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw new Error('Failed to get wishlist');
  }
};

export const addToWishlist = async (
  wishlistData: Product | CartProduct,
  authToken?: string
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

export const clearWishList = async (authToken?: string) => {
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
export const removeWishlistItem = async (id: number, authToken?: string) => {
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
