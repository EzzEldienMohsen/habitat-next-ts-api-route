'use server';
import { Product, Products } from '@/assets/types';
import { autoFetch } from '@/utils';

export const fetchProducts = async ({
  limit = 8,
  offset = 0,
  category,
  latest = false,
}: {
  limit?: number;
  offset?: number;
  category?: string;
  latest?: boolean;
}): Promise<{
  products: Products;
  totalPages?: number;
  currentPage?: number;
}> => {
  const params: Record<string, string | number | boolean> = {
    limit,
    offset,
    latest,
  };
  if (category) params.category = category;
  try {
    const response = await autoFetch('/products', params);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${(error as Error).message}`);
  }
};
export const fetchProductById = async (
  id: number
): Promise<{ product: Product }> => {
  try {
    const response = await autoFetch(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${(error as Error).message}`);
  }
};
