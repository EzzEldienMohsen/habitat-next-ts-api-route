import { Product, Products } from '@/assets/types';
import pool from '@/db';

//getting the products from a single route
export const getProducts = async ({
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
  success: boolean;
  totalPages?: number;
  currentPage?: number;
}> => {
  try {
    let query = `SELECT * FROM products`;
    const params: any[] = [];

    // Add conditions for category
    if (category) {
      query += ` WHERE cat = $${params.length + 1}`;
      params.push(category);
    }

    // Add conditions for ordering (latest)
    if (latest) {
      query += ` ORDER BY id DESC LIMIT 4`;
    } else {
      query += ` LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
      params.push(limit, offset);
    }

    const productsResult = await pool.query(query, params);
    const products = productsResult.rows as Products;

    // If paginated, calculate total count, total pages, and current page
    if (!latest) {
      const countQuery = `SELECT COUNT(*) AS count FROM products ${
        category ? `WHERE cat = $1` : ''
      }`;
      const countParams = category ? [category] : [];
      const totalCountResult = await pool.query(countQuery, countParams);
      const totalCount = parseInt(totalCountResult.rows[0].count, 10);
      const totalPages = Math.ceil(totalCount / limit);
      const currentPage = Math.floor(offset / limit) + 1;

      return {
        products,
        success: true,
        totalPages,
        currentPage,
      };
    }

    // Return products for the "latest" case
    return { success: true, products };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching products:', err.message);
    throw new Error('Failed to fetch products.');
  }
};

// get single product

export const getProductById = async (
  id: string
): Promise<{ success: boolean; product: Product }> => {
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [
      Number(id),
    ]);
    const product = result.rows[0] as Product;
    return { success: true, product };
  } catch (error) {
    const err = error as Error;
    console.error('Error fetching products:', err.message);
    throw new Error('Failed to fetch products.');
  }
};
