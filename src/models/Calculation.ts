import mongoose, { Schema, Document, Model } from 'mongoose';

export type CalculationType = 'mortgage' | 'rent' | 'prorated_rent';
export type Currency = 'USD' | 'INR';

export interface MortgageInputs {
  principal: number;
  downPayment: number;
  interestRate: number;
  tenure: number; // in years
}

export interface RentInputs {
  monthlyRent: number;
}

export interface ProratedRentInputs {
  monthlyRent: number;
  moveInDate: string;
  daysOccupied: number;
  month: string;
}

export interface ICalculation extends Document {
  userId: mongoose.Types.ObjectId;
  type: CalculationType;
  currency: Currency;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  results: any;
  createdAt: Date;
  updatedAt: Date;
}

const CalculationSchema = new Schema<ICalculation>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['mortgage', 'rent', 'prorated_rent'],
      required: true,
    },
    currency: {
      type: String,
      enum: ['USD', 'INR'],
      required: true,
    },
    inputs: {
      type: Schema.Types.Mixed,
      required: true,
    },
    results: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for faster user-specific queries
CalculationSchema.index({ userId: 1, createdAt: -1 });

const Calculation: Model<ICalculation> =
  mongoose.models.Calculation || mongoose.model<ICalculation>('Calculation', CalculationSchema);

export default Calculation;
