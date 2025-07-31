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
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-[60] lg:hidden">
      <nav className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-xl px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center space-x-4 sm:space-x-6">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center transition-all duration-300 min-w-[48px] sm:min-w-[52px] relative group",
                  "hover:scale-110 active:scale-95",
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                )}
              >
                {/* Active indicator background */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl -z-10 scale-110" />
                )}
                
                {/* Icon with enhanced styling */}
                <div className={cn(
                  "relative p-2 rounded-lg transition-all duration-300",
                  isActive 
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25" 
                    : "group-hover:bg-slate-100"
                )}>
                  <Icon
                    className={cn(
                      "w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300",
                      isActive && "scale-110"
                    )}
                  />
                </div>
                
                {/* Label */}
                <span className={cn(
                  "text-xs font-medium leading-tight mt-1 transition-all duration-300",
                  isActive ? "text-blue-600 font-semibold" : "text-slate-600"
                )}>
                  {item.name}
                </span>
                
                {/* Active indicator dot */}
                {isActive && (
                  <div className="absolute -bottom-1 w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse" />
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
} 