"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowLeft, 
  Star, 
  Calendar, 
  Tag, 
  Edit, 
  Trash2, 
  Share2, 
  Heart,
  Phone,
  MapPin,
  Clock,
  ShoppingCart
} from "lucide-react"
import { notFound } from "next/navigation"

interface Item {
  id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  newPrice: number;
  category: string;
}

export default function ItemDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [item, setItem] = useState<Item | null>(null)
  const [loading, setLoading] = useState(true)
  const [added, setAdded] = useState(false)
  
  const itemId = params.id as string
  
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${itemId}`)
        if (!response.ok) {
          throw new Error('Item not found')
        }
        const data = await response.json()
        setItem(data)
      } catch (error) {
        console.error('Error fetching item:', error)
        notFound()
      } finally {
        setLoading(false)
      }
    }
    
    fetchItem()
  }, [itemId])

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
    }, 700)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.name,
        text: item?.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Lien copié dans le presse-papiers !')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-3 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!item) {
    notFound()
  }

  const discountPercentage = Math.round(((item.price - item.newPrice) / item.price) * 100)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.back()}
                className="w-10 h-10"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
                <p className="text-gray-600">Service dentaire</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className={`w-10 h-10 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="w-10 h-10"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl aspect-[4/3]">
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover"
              />
              {/* Discount Badge */}
              <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                -{discountPercentage}%
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{item.name}</h2>
              <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Prix</h3>
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  Catégorie {item.category}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 line-through">{item.price.toLocaleString()} DA</span>
                  <span className="text-2xl font-bold text-blue-600">{item.newPrice.toLocaleString()} DA</span>
                </div>
                <div className="text-sm text-gray-500">
                  Économisez {discountPercentage}% sur le prix original
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleAdd}
                className={`flex-1 h-12 text-lg font-semibold ${
                  added 
                    ? "bg-green-500 hover:bg-green-600" 
                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                }`}
              >
                {added ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Ajouté au panier</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Ajouter au panier</span>
                  </div>
                )}
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 h-12 text-lg font-semibold"
                onClick={() => router.push('/cart')}
              >
                Voir le panier
              </Button>
            </div>

            {/* Additional Information */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations supplémentaires</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Durée du traitement: 30-60 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Satisfaction client: 4.8/5</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Garantie incluse</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 