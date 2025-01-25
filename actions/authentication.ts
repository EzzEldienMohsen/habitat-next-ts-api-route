'use server';

import { ClientSignupSchema } from '@/assets/zodValidationSchemas';
import { autoFetch } from '@/utils';
import { hashUserPassword } from '@/utils/hash';

//  sign up
export const signUpAction = async (
  prevState: {
    error?: { field: string; message: string }[];
    success?: boolean;
    token?: string;
  },
  formData: FormData
) => {
  const formValue = {
    f_name: formData.get('f_name') as string,
    l_name: formData.get('l_name') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
  };
  const validationResult = ClientSignupSchema.safeParse(formValue);

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
  const hashedPassword = hashUserPassword(formValue.password);
  const sentFormValues = {
    f_name: formValue.f_name,
    l_name: formValue.l_name,
    email: formValue.email,
    phone: formValue.phone,
    password: hashedPassword,
  };
  try {
    const response = await autoFetch.post('/auth/sign-up', sentFormValues);
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
