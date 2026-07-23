import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { sendVerificationEmail, generateVerificationToken, getTokenExpiry } from '@/lib/mailer';

const signupSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedFields = signupSchema.safeParse(body);

    if (!validatedFields.success) {
      return NextResponse.json(
        { error: 'Invalid fields', details: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = validatedFields.data;

    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateVerificationToken();
    const verificationTokenExpiry = getTokenExpiry();

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: 'credentials',
      emailVerified: null,
      verificationToken,
      verificationTokenExpiry,
    });

    // Send verification email
    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      {
        message: 'Account created successfully. Please check your email to verify your account.',
        userId: user._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Failed to create account. Please try again.' },
      { status: 500 }
    );
  }
}
