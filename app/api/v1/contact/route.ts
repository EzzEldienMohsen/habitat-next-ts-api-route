import { addMessage } from '@/controllers/contact';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { name, phone, email, message } = await req.json(); // Use req.json()
    const result = await addMessage(name, phone, email, message);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('Error in API route:', (error as Error).message);
    return NextResponse.json(
      { error: 'Failed to fetch products.' },
      { status: 500 }
    );
  }
};
