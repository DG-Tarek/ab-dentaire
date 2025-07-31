import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number, currency: string = 'DZD'): string {
  if (!price && price !== 0) return ''

  const formatter = new Intl.NumberFormat('fr-DZ', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return formatter.format(price)
}

export type SortOption = 
  | "name-asc" 
  | "name-desc" 
  | "price-asc" 
  | "price-desc" 
  | "rating-asc" 
  | "rating-desc"

export function sortItems<T extends { name: string; price: number; rating?: number }>(
  items: T[], 
  sortOption: SortOption
): T[] {
  const sortedItems = [...items]
  
  switch (sortOption) {
    case "name-asc":
      return sortedItems.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return sortedItems.sort((a, b) => b.name.localeCompare(a.name))
    case "price-asc":
      return sortedItems.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sortedItems.sort((a, b) => b.price - a.price)
    case "rating-asc":
      return sortedItems.sort((a, b) => (a.rating || 0) - (b.rating || 0))
    case "rating-desc":
      return sortedItems.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    default:
      return sortedItems
  }
}
