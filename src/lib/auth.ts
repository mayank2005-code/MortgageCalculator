import NextAuth, { NextAuthConfig } from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import dbConnect from './db';
import User from '@/models/User';

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const authConfig: NextAuthConfig = {
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = credentialsSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        await dbConnect();
        
        const user = await User.findOne({ email }).select('+password');

        if (!user || !user.password) {
          return null;
        }

        // Check if email is verified for credentials users
        if (user.provider === 'credentials' && !user.emailVerified) {
          throw new Error('Please verify your email before signing in');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        await dbConnect();
        
        const existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          // Create new user for Google OAuth
          const newUser = await User.create({
            name: user.name || '',
            email: user.email || '',
            image: user.image || undefined,
            provider: 'google',
            emailVerified: new Date(),
          });
          // Update user object with MongoDB _id
          user.id = newUser._id.toString();
        } else if (existingUser.provider !== 'google') {
          // Email exists with different provider
          return false;
        } else {
          // Update user object with existing MongoDB _id
          user.id = existingUser._id.toString();
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      // Always fetch MongoDB user ID on first sign-in
      if (user?.email) {
        await dbConnect();
        const dbUser = await User.findOne({ email: user.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
