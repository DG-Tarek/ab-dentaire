import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-10 h-10 text-gray-400" />
        </div>
        
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          Service non trouvé
        </h1>
        
        <p className="text-sm text-gray-600 mb-8">
          Le service que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        
        <div className="space-y-4">
          <Link href="/item">
            <Button className="w-full">
              Retour aux services
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="ghost" className="w-full">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
} 