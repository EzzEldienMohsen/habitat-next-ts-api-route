import { messageSchema } from '@/assets/zodValidationSchemas';
import { autoFetch } from '@/utils';

export const sendMessage = async (
  prevState: { error?: { field: string; message: string }[] },
  formData: FormData
): Promise<{
  error?: { field: string; message: string }[];
  success?: boolean;
}> => {
  const formValues = {
    name: formData.get('name')?.toString() || '',
    phone: formData.get('phone')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    message: formData.get('message')?.toString() || '',
  };

  // Validate with Zod Schema
  const validationResult = messageSchema.safeParse(formValues);

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
    const response = await autoFetch.post('/contact', formValues);
    return { success: response.data };
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
