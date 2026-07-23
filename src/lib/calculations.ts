import { format, getDaysInMonth, parseISO } from 'date-fns';

export interface MortgageCalculationResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  amortizationSchedule: AmortizationEntry[];
  chartData: ChartDataPoint[];
}

export interface AmortizationEntry {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface ChartDataPoint {
  year: number;
  balance: number;
  principal: number;
  interest: number;
  [key: string]: number;
}

export interface RentVsBuyData {
  year: number;
  rentCost: number;
  buyCost: number;
}

/**
 * Calculate monthly EMI using standard amortization formula
 * EMI = P × r × (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateMortgage(
  principal: number,
  annualRate: number,
  tenureYears: number
): MortgageCalculationResult {
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = tenureYears * 12;

  // Calculate EMI
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const monthlyPayment = emi;
  const totalPayment = emi * numPayments;
  const totalInterest = totalPayment - principal;

  // Generate amortization schedule (year by year)
  const amortizationSchedule: AmortizationEntry[] = [];
  const chartData: ChartDataPoint[] = [];
  
  let balance = principal;
  
  for (let year = 1; year <= tenureYears; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;

    // Calculate for 12 months
    for (let month = 1; month <= 12; month++) {
      if (balance <= 0) break;

      const interestPayment = balance * monthlyRate;
      const principalPayment = emi - interestPayment;

      yearPrincipal += principalPayment;
      yearInterest += interestPayment;
      balance -= principalPayment;
    }

    amortizationSchedule.push({
      year,
      principalPaid: yearPrincipal,
      interestPaid: yearInterest,
      balance: Math.max(0, balance),
    });

    chartData.push({
      year,
      balance: Math.max(0, balance),
      principal: yearPrincipal,
      interest: yearInterest,
    });
  }

  return {
    monthlyPayment,
    totalPayment,
    totalInterest,
    amortizationSchedule,
    chartData,
  };
}

/**
 * Calculate simple monthly rent
 */
export function calculateRent(monthlyRent: number) {
  return {
    monthlyRent,
    yearlyRent: monthlyRent * 12,
    fiveYearRent: monthlyRent * 12 * 5,
    tenYearRent: monthlyRent * 12 * 10,
  };
}

/**
 * Calculate prorated rent using Actual Days in Month method
 * Formula: (Monthly Rent / Days in Current Month) × Number of Days Occupied
 */
export function calculateProratedRent(
  monthlyRent: number,
  moveInDate: string,
  daysOccupied: number
): { proratedRent: number; dailyRate: number; daysInMonth: number } {
  const date = parseISO(moveInDate);
  const daysInMonth = getDaysInMonth(date);
  const dailyRate = monthlyRent / daysInMonth;
  const proratedRent = dailyRate * daysOccupied;

  return {
    proratedRent,
    dailyRate,
    daysInMonth,
  };
}

/**
 * Rent vs Buy comparison over time
 */
export function calculateRentVsBuy(
  principal: number,
  annualRate: number,
  tenureYears: number,
  monthlyRent: number,
  rentIncrease: number = 3 // Annual rent increase percentage
): RentVsBuyData[] {
  const mortgage = calculateMortgage(principal, annualRate, tenureYears);
  const data: RentVsBuyData[] = [];

  let cumulativeRent = 0;
  let cumulativeBuy = 0;
  let currentRent = monthlyRent;

  for (let year = 1; year <= Math.min(tenureYears, 20); year++) {
    // Rent increases each year
    cumulativeRent += currentRent * 12;
    currentRent = currentRent * (1 + rentIncrease / 100);

    // Buy: mortgage payments
    cumulativeBuy += mortgage.monthlyPayment * 12;

    data.push({
      year,
      rentCost: cumulativeRent,
      buyCost: cumulativeBuy,
    });
  }

  return data;
}
