import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen p-4 pattern-overlay">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[80vh] text-center">
        <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Welcome to <span className="text-blue-600 dark:text-blue-400">AB Dentaire</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
          Discover our premium dental products and equipment. Quality care starts with quality tools.
        </p>
        <Link href="/shop">
          <Button className="text-sm px-6 py-2 h-10">
            Browse Our Products
          </Button>
        </Link>
      </div>
    </div>
  );
}