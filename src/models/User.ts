import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  emailVerified: Date | null;
  image?: string;
  provider: 'google' | 'credentials';
  verificationToken?: string;
  verificationTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    },
    emailVerified: {
      type: Date,
      default: null,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
      enum: ['google', 'credentials'],
      required: true,
    },
    verificationToken: {
      type: String,
      select: false,
    },
    verificationTokenExpiry: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

// Create unique index for email
UserSchema.index({ email: 1 }, { unique: true });

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
