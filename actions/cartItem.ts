'use server';

import { autoFetch } from '@/utils';

export const updateCartItem = async (
  authToken: string | undefined,
  id: number,
  newAmount: number
) => {
  try {
    const response = await autoFetch.patch(
      `/cart/${id}`,
      {
        newAmount,
      },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw new Error('Failed to update cart item');
  }
};

export const removeCartItem = async (
  authToken: string | undefined,
  id: number
) => {
  try {
    const response = await autoFetch.delete(
      `/cart/${id}`,

      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw new Error('Failed to delete cart item');
  }
};
