import pool from '@/db';

export const addMessage = async (
  name: string,
  phone: string,
  email: string,
  message: string
) => {
  try {
    await pool.query(
      'INSERT INTO contact (name, phone, email, message) VALUES ($1, $2, $3, $4)',
      [name, phone, email, message]
    );
    return { success: true, message: 'Message sent successfully.' };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to add the message to the database.');
  }
};
