import { ReactNode } from "react"
import { BottomNavigation } from "./bottom-navigation"

interface MobileLayoutProps {
  children: ReactNode
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <main className="pb-20">
        {children}
      </main>
      <BottomNavigation />
    </div>
  )
} 