import axios, { AxiosInstance } from 'axios';

export const formatPrice = (price: number) => {
  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
  return dollarsAmount;
};

// Define the base URL
const url = 'https://habitat-next-ts-api-route.vercel.app/api/v1';

// Create an Axios instance
export const autoFetch: AxiosInstance = axios.create({
  baseURL: url,
});
