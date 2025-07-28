"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function TestRoutePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-2xl font-bold">Test Route Page</h1>
        <p className="text-gray-600">This page is working correctly!</p>
        <Button onClick={() => router.push('/cards')}>
          Go to Cards
        </Button>
      </div>
    </div>
  )
} 