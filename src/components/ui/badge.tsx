import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline"
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variant === "default"
            ? "border-transparent bg-blue-600 text-white hover:bg-blue-700"
            : variant === "secondary"
            ? "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200"
            : "text-gray-600",
          className
        )}
        {...props}
      />
    )
  }
)
Badge.displayName = "Badge"

export { Badge } 