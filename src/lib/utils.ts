import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  amount: number | string,
  options: {
    currency?: 'INR' | 'USD';
    notation?: Intl.NumberFormatOptions['notation'];
  } = {}
) {
  const { currency = 'INR', notation = 'standard' } = options;

  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(numericAmount);
}
