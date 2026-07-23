import { Currency } from '@/models/Calculation';

/**
 * Format number in Indian numbering system (Lakhs/Crores)
 */
export function formatINR(amount: number, showDecimals: boolean = false): string {
  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;

  let formatted: string;

  if (absAmount >= 10000000) {
    // Crores (1 Crore = 10,000,000)
    formatted = `${(absAmount / 10000000).toFixed(showDecimals ? 2 : 1)} Cr`;
  } else if (absAmount >= 100000) {
    // Lakhs (1 Lakh = 100,000)
    formatted = `${(absAmount / 100000).toFixed(showDecimals ? 2 : 1)} L`;
  } else if (absAmount >= 1000) {
    // Thousands
    formatted = `${(absAmount / 1000).toFixed(showDecimals ? 2 : 1)} K`;
  } else {
    formatted = absAmount.toFixed(showDecimals ? 2 : 0);
  }

  return `${isNegative ? '-' : ''}₹${formatted}`;
}

/**
 * Format number in US dollar format
 */
export function formatUSD(amount: number, showDecimals: boolean = false): string {
  const absAmount = Math.abs(amount);
  const isNegative = amount < 0;

  let formatted: string;

  if (absAmount >= 1000000) {
    // Millions
    formatted = `${(absAmount / 1000000).toFixed(showDecimals ? 2 : 1)}M`;
  } else if (absAmount >= 1000) {
    // Thousands
    formatted = `${(absAmount / 1000).toFixed(showDecimals ? 2 : 1)}K`;
  } else {
    formatted = absAmount.toFixed(showDecimals ? 2 : 0);
  }

  return `${isNegative ? '-' : ''}$${formatted}`;
}

/**
 * Format currency based on selected currency type
 */
export function formatCurrency(
  amount: number,
  currency: Currency,
  showDecimals: boolean = false
): string {
  return currency === 'INR' ? formatINR(amount, showDecimals) : formatUSD(amount, showDecimals);
}

/**
 * Format number with commas (for detailed displays)
 */
export function formatNumber(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

/**
 * Get currency symbol
 */
export function getCurrencySymbol(currency: Currency): string {
  return currency === 'INR' ? '₹' : '$';
}
