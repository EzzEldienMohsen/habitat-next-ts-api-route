import { ClientAddressSchema } from '@/assets/zodValidationSchemas';
import { autoFetch } from '@/utils';

// Getting all the addresses
export const getAllAddresses = async (authToken: string | undefined) => {
  try {
    const response = await autoFetch('/address', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to get addresses');
  }
};
// creating addresses
export const createAddress = async (
  authToken: string | undefined,
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
  },
  formData: FormData
) => {
  const address_name = formData.get('address_name') as string;
  const address_details = formData.get('address_details') as string;

  const validationResult = ClientAddressSchema.safeParse({
    address_name,
    address_details,
  });

  if (!validationResult.success) {
    const errorMap = validationResult.error.format();
    const errors = Object.entries(errorMap).flatMap(([key, value]) => {
      if (Array.isArray(value)) {
        // If it's a string array, map directly
        return value.map((message) => ({
          field: key,
          message,
        }));
      } else if (value && '_errors' in value) {
        // If it's an object with _errors, map those
        return value._errors.map((message) => ({
          field: key,
          message,
        }));
      }
      return []; // No errors for this field
    });
    return { error: errors, success: false }; // Include success flag
  }
  try {
    const response = await autoFetch.post(
      `/address`,
      { address_name, address_details },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to create address');
  }
};
