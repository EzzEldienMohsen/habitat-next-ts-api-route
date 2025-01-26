'use server';
import { ClientAddressSchema } from '@/assets/zodValidationSchemas';
import { autoFetch } from '@/utils';

// Getting a single address
export const getSingleAddress = async (
  authToken: string | undefined,
  id: string
) => {
  try {
    const response = await autoFetch(`/address/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching address:', error);
    throw new Error('Failed to get the address');
  }
};

// updating a single address
export const updateAddress = async (
  authToken: string | undefined,
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
  },
  formData: FormData
) => {
  const id = Number(formData.get('id'));
  if (isNaN(id)) {
    return { error: [{ field: 'id', message: 'Invalid address ID' }] };
  }
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
    const response = await autoFetch.patch(
      `/address/${id}`,
      { address_name, address_details },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error);
    throw new Error('Failed to update address');
  }
};

// delete address

export const deleteAddress = async (
  authToken: string | undefined,
  prevState: { success?: boolean },
  formData: FormData
) => {
  const id = Number(formData.get('id'));
  if (!id) return { success: false };
  try {
    const response = await autoFetch.delete(`profile/${id}`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting address:', error);
    throw new Error('Failed to delete address');
  }
};
