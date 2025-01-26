'use server';

import { ClientUserSchema } from '@/assets/zodValidationSchemas';
import { autoFetch } from '@/utils';

export const getProfile = async (authToken: string | undefined) => {
  try {
    const response = await autoFetch('/profile', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw new Error('Failed to get profile');
  }
};
export const updateProfile = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
  },
  formData: FormData,
  authToken: string | undefined
) => {
  const data = Object.fromEntries(formData.entries());

  const validationResult = ClientUserSchema.safeParse(data);
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
      '/profile',
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
      data
    );
    return response.data;
  } catch (error) {
    console.error('Database Error:', error);
    return {
      error: [
        {
          field: 'form',
          message: 'Something went wrong. Please try again.',
        },
      ],
    };
  }
};

export const deleteProfile = async (authToken: string | undefined) => {
  try {
    const response = await autoFetch.delete('/profile', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Failed to delete profile');
  }
};
