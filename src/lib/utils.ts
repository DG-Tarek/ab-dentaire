import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Currency formatting utilities
export const CURRENCY = {
  DA: 'DA',
  EUR: '€',
  USD: '$'
} as const;

export type Currency = typeof CURRENCY[keyof typeof CURRENCY];

// Default currency for the application
export const DEFAULT_CURRENCY: Currency = CURRENCY.DA;

// Exchange rates (simplified - in a real app, these would come from an API)
const EXCHANGE_RATES = {
  [CURRENCY.DA]: 1,
  [CURRENCY.EUR]: 0.007, // 1 DA = 0.007 EUR (approximate)
  [CURRENCY.USD]: 0.0075 // 1 DA = 0.0075 USD (approximate)
} as const;

// Convert price from DA to selected currency
export function convertPrice(price: number, fromCurrency: Currency = CURRENCY.DA, toCurrency: Currency = DEFAULT_CURRENCY): number {
  if (fromCurrency === toCurrency) return price;
  
  // Convert to DA first (base currency)
  const priceInDA = fromCurrency === CURRENCY.DA ? price : price / EXCHANGE_RATES[fromCurrency];
  
  // Convert from DA to target currency
  return priceInDA * EXCHANGE_RATES[toCurrency];
}

// Format price with currency symbol
export function formatPrice(price: number, currency: Currency = DEFAULT_CURRENCY): string {
  const convertedPrice = convertPrice(price, CURRENCY.DA, currency);
  return `${convertedPrice.toLocaleString(undefined, { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: currency === CURRENCY.DA ? 0 : 2 
  })} ${currency}`;
}

// Format price range
export function formatPriceRange(min: number, max: number, currency: Currency = DEFAULT_CURRENCY): string {
  const convertedMin = convertPrice(min, CURRENCY.DA, currency);
  const convertedMax = convertPrice(max, CURRENCY.DA, currency);
  
  return `${convertedMin.toLocaleString(undefined, { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: currency === CURRENCY.DA ? 0 : 2 
  })} - ${convertedMax.toLocaleString(undefined, { 
    minimumFractionDigits: 0, 
    maximumFractionDigits: currency === CURRENCY.DA ? 0 : 2 
  })} ${currency}`;
}

// Sorting utilities
export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "rating-asc"
  | "rating-desc"
  | "discount-asc"
  | "discount-desc";

interface SortableItem {
  name: string;
  price: number;
  newPrice?: number;
  rating?: number;
}

export function sortItems<T extends SortableItem>(items: T[], sortOption: SortOption): T[] {
  const sortedItems = [...items];
  
  switch (sortOption) {
    case "name-asc":
      return sortedItems.sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    case "name-desc":
      return sortedItems.sort((a, b) => b.name.localeCompare(a.name, 'fr'));
    case "price-asc":
      return sortedItems.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sortedItems.sort((a, b) => b.price - a.price);
    case "rating-asc":
      return sortedItems.sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingA - ratingB;
      });
    case "rating-desc":
      return sortedItems.sort((a, b) => {
        const ratingA = a.rating || 0;
        const ratingB = b.rating || 0;
        return ratingB - ratingA;
      });
    case "discount-asc":
      return sortedItems.sort((a, b) => {
        const discountA = a.newPrice ? ((a.price - a.newPrice) / a.price) * 100 : 0;
        const discountB = b.newPrice ? ((b.price - b.newPrice) / b.price) * 100 : 0;
        return discountA - discountB;
      });
    case "discount-desc":
      return sortedItems.sort((a, b) => {
        const discountA = a.newPrice ? ((a.price - a.newPrice) / a.price) * 100 : 0;
        const discountB = b.newPrice ? ((b.price - b.newPrice) / b.price) * 100 : 0;
        return discountB - discountA;
      });
    default:
      return sortedItems;
  }
} 