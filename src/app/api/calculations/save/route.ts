import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Calculation from '@/models/Calculation';
import mongoose from 'mongoose';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Validate user ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
      console.error('Invalid user ID format:', session.user.id);
      return NextResponse.json(
        { error: 'Invalid user session. Please sign out and sign in again.' },
        { status: 400 }
      );
    }

    const body = await req.json();
    const { type, currency, inputs, results } = body;

    if (!type || !currency || !inputs || !results) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const calculation = await Calculation.create({
      userId: new mongoose.Types.ObjectId(session.user.id),
      type,
      currency,
      inputs,
      results,
    });

    return NextResponse.json(
      { message: 'Calculation saved successfully', id: calculation._id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Save calculation error:', error);
    return NextResponse.json(
      { error: 'Failed to save calculation' },
      { status: 500 }
    );
  }
}
