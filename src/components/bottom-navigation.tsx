"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, User, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Shop",
    href: "/shop",
    icon: ShoppingBag,
  },
  {
    name: "Favorite",
    href: "/favorite",
    icon: Heart,
  },
  {
    name: "Account",
    href: "/account",
    icon: User,
  },
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-2 sm:bottom-3 left-1/2 transform -translate-x-1/2 z-[60] lg:hidden">
      <nav className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md px-3 sm:px-4 py-1.5 sm:py-2">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center transition-all duration-200 min-w-[40px] sm:min-w-[44px]",
                  "hover:scale-105",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                )}
              >
                <Icon
                  className={cn(
                    "w-4 h-4 sm:w-5 sm:h-5 mb-0.5",
                    isActive && "scale-110"
                  )}
                />
                <span className="text-xs font-medium leading-tight">{item.name}</span>
                {isActive && (
                  <div className="w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full mt-0.5" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
} 