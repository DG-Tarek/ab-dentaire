import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline"
  size?: "default" | "icon"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variant === "ghost"
            ? "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
            : variant === "outline"
            ? "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50"
            : "bg-blue-600 text-white hover:bg-blue-700",
          size === "icon"
            ? "h-8 w-8 p-0"
            : "h-8 px-3 py-1.5",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button" 