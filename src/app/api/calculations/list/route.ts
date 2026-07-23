import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Calculation from '@/models/Calculation';
import mongoose from 'mongoose';

export async function GET() {
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

    await dbConnect();

    const calculations = await Calculation.find({
      userId: new mongoose.Types.ObjectId(session.user.id),
    })
      .sort({ createdAt: -1 })
      .limit(50);

    return NextResponse.json(calculations);
  } catch (error) {
    console.error('List calculations error:', error);
    return NextResponse.json({ error: 'Failed to fetch calculations' }, { status: 500 });
  }
}
