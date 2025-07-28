"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, ShoppingCart, User, Filter as FilterIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "./cart-context"

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
    isLink: true,
  },
  {
    name: "Filter",
    href: "/filter",
    icon: FilterIcon,
    isLink: true,
  },
  {
    name: "Favorite",
    href: "/favorite",
    icon: Heart,
    isLink: true,
  },
  {
    name: "Cart",
    href: "/cart",
    icon: ShoppingCart,
    isLink: false, // This will open the cart drawer instead
  },
  {
    name: "Account",
    href: "/account",
    icon: User,
    isLink: true,
  },
]

export function BottomNavigation() {
  const pathname = usePathname()
  const { openCart } = useCart()

  return (
    <div className="fixed bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 z-[60]">
      <nav className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg px-4 sm:px-6 py-2 sm:py-3">
        <div className="flex items-center space-x-4 sm:space-x-6 lg:space-x-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            if (item.isLink) {
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center justify-center transition-all duration-200 min-w-[48px] sm:min-w-[56px]",
                    "hover:scale-105",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-5 h-5 sm:w-6 sm:h-6 mb-1",
                      isActive && "scale-110"
                    )}
                  />
                  <span className="text-xs font-medium leading-tight">{item.name}</span>
                  {isActive && (
                    <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-1" />
                  )}
                </Link>
              )
            } else {
              // Cart item - opens drawer instead of navigation
              return (
                <button
                  key={item.name}
                  onClick={openCart}
                  className={cn(
                    "flex flex-col items-center justify-center transition-all duration-200 min-w-[48px] sm:min-w-[56px]",
                    "hover:scale-105",
                    "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                  <span className="text-xs font-medium leading-tight">{item.name}</span>
                </button>
              )
            }
          })}
        </div>
      </nav>
    </div>
  )
} 