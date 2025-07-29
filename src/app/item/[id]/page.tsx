"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CardItem } from "@/components/card-item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, Star, ShoppingCart } from "lucide-react"
import { dummyCards, Card as CardType } from "@/lib/data"

export default function CardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [card, setCard] = useState<CardType | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const cardId = params.id as string
    const foundCard = dummyCards.find(c => c.id === cardId)
    setCard(foundCard || null)
  }, [params.id])

  if (!card) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service non trouvé</h1>
          <p className="text-gray-600 mb-6">Le service que vous recherchez n'existe pas.</p>
          <Button onClick={() => router.push("/item")}>
            Retour aux services
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    // Add to cart logic here
    console.log(`Added ${quantity} of ${card.title} to cart`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: card.description,
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => router.push("/shop")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleFavorite}
                className={`w-10 h-10 ${isFavorite ? 'text-red-500' : 'text-gray-400'}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleShare}
                className="w-10 h-10 text-gray-400"
              >
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image and Details */}
          <div className="space-y-8">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge className="bg-blue-600 text-white">
                  {card.category}
                </Badge>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Right Column - Info and Actions */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{card.title}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0 - 128 avis)</span>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{card.description}</p>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-baseline gap-4">
                <span className="text-3xl font-bold text-blue-600">
                  {card.price.toLocaleString()} DA
                </span>
                <span className="text-lg text-gray-500 line-through">
                  {(card.price * 1.2).toLocaleString()} DA
                </span>
                <Badge className="bg-red-500 text-white">
                  -20%
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Livraison gratuite • Disponible immédiatement
              </p>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantité:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10"
                  >
                    -
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[60px]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10"
                  >
                    +
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 text-lg font-semibold"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Ajouter au panier
              </Button>
            </div>

            {/* Additional Info */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-4">
              <h3 className="font-semibold text-gray-900">Informations supplémentaires</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Catégorie:</span>
                  <p className="font-medium">{card.category}</p>
                </div>
                <div>
                  <span className="text-gray-600">Disponibilité:</span>
                  <p className="font-medium text-green-600">En stock</p>
                </div>
                <div>
                  <span className="text-gray-600">Livraison:</span>
                  <p className="font-medium">2-3 jours ouvrables</p>
                </div>
                <div>
                  <span className="text-gray-600">Garantie:</span>
                  <p className="font-medium">1 an</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 