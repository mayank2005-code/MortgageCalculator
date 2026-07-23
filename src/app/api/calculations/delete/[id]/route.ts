import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Calculation from '@/models/Calculation';
import mongoose from 'mongoose';

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid calculation ID' }, { status: 400 });
    }

    await dbConnect();

    const calculation = await Calculation.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: new mongoose.Types.ObjectId(session.user.id),
    });

    if (!calculation) {
      return NextResponse.json({ error: 'Calculation not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Calculation deleted successfully' });
  } catch (error) {
    console.error('Delete calculation error:', error);
    return NextResponse.json({ error: 'Failed to delete calculation' }, { status: 500 });
  }
}
