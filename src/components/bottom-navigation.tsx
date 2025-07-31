"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Heart, User, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"
import { COMPONENT_SCALING } from "@/lib/responsive-scaling"

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
                  "flex flex-col items-center justify-center transition-all duration-300 relative group",
                  "hover:scale-110 active:scale-95",
                  COMPONENT_SCALING.navigation.button.mobile,
                  "sm:" + COMPONENT_SCALING.navigation.button.tablet,
                  "lg:" + COMPONENT_SCALING.navigation.button.desktop,
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
                  "relative rounded-lg transition-all duration-300",
                  "p-1 sm:p-1.5 lg:p-2",
                  isActive 
                    ? "bg-gradient-to-br from-blue-600 to-indigo-600 text-white" 
                    : "group-hover:bg-slate-100"
                )}>
                  <Icon
                    className={cn(
                      COMPONENT_SCALING.navigation.icon.mobile,
                      "sm:" + COMPONENT_SCALING.navigation.icon.tablet,
                      "lg:" + COMPONENT_SCALING.navigation.icon.desktop,
                      "transition-all duration-300",
                      isActive && "scale-110"
                    )}
                  />
                </div>
                
                {/* Label */}
                <span className={cn(
                  COMPONENT_SCALING.navigation.text.mobile,
                  "sm:" + COMPONENT_SCALING.navigation.text.tablet,
                  "lg:" + COMPONENT_SCALING.navigation.text.desktop,
                  "font-medium leading-tight mt-1 transition-all duration-300",
                  isActive ? "text-blue-600 font-semibold" : "text-slate-600"
                )}>
                  {item.name}
                </span>
                

              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
} 