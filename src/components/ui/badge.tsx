import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline"
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
          variant === "default" && "bg-blue-100 text-blue-800 hover:bg-blue-200",
          variant === "secondary" && "bg-gray-100 text-gray-800 hover:bg-gray-200",
          variant === "destructive" && "bg-red-100 text-red-800 hover:bg-red-200",
          variant === "outline" && "border border-gray-200 text-gray-700 hover:bg-gray-50",
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge" 