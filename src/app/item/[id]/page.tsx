"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CardItem } from "@/components/card-item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, HeartOff } from "lucide-react"
import { dummyCards, Card as CardType } from "@/lib/data"
import { formatPrice } from "@/lib/utils"
import { useCurrency } from "@/components/currency-context"

export default function CardDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { selectedCurrency } = useCurrency()
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
      {/* Header - Mobile First */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <Button
              variant="ghost"
              onClick={() => router.push("/shop")}
              className="flex items-center gap-2 h-10 sm:h-12 px-3 sm:px-4 touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base font-medium">Retour</span>
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="w-10 h-10 sm:w-12 sm:h-12 text-gray-600 hover:text-gray-900 touch-manipulation"
            >
              <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile First */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
        {/* Mobile Layout - Stacked */}
        <div className="space-y-6 sm:space-y-8 lg:hidden">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square sm:aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <Badge className="bg-blue-100 text-blue-800 border-0 text-sm sm:text-base px-3 py-1">
              {card.category}
            </Badge>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {card.title}
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {card.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-6">
              <div className="flex items-baseline gap-3 sm:gap-4">
                <span className="text-2xl sm:text-3xl font-bold text-blue-600">
                  {card.price ? formatPrice(card.price) : ''}
                </span>
                <span className="text-lg sm:text-xl text-gray-500 line-through">
                  {card.price ? formatPrice(card.price * 1.2) : ''}
                </span>
                <Badge className="bg-red-500 text-white text-sm px-2 py-1">
                  -20%
                </Badge>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm sm:text-base font-medium text-gray-700">Quantité:</label>
                <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white">
                  <Button
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 text-gray-600 hover:bg-gray-50 touch-manipulation"
                  >
                    <span className="text-xl font-semibold">−</span>
                  </Button>
                  <span className="px-6 py-3 text-center min-w-[80px] text-lg font-semibold text-gray-900 bg-gray-50">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 text-gray-600 hover:bg-gray-50 touch-manipulation"
                  >
                    <span className="text-xl font-semibold">+</span>
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 sm:gap-4">
                <Button
                  variant="outline"
                  onClick={toggleFavorite}
                  className={`w-14 h-14 sm:w-16 sm:h-16 border-2 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg touch-manipulation ${
                    isFavorite 
                      ? 'text-red-500 border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg' 
                      : 'text-gray-500 border-gray-300 hover:border-red-300 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50'
                  }`}
                >
                  <Heart className={`w-7 h-7 sm:w-8 sm:h-8 transition-all duration-300 ${
                    isFavorite ? 'fill-current scale-110' : ''
                  }`} />
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 sm:py-5 text-base sm:text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out border-0 h-14 sm:h-16 touch-manipulation"
                >
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 transition-transform duration-300 group-hover:scale-110" />
                  Ajouter au panier
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout - Side by Side */}
        <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Left Column - Image */}
          <div className="sticky top-24">
            <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-xl">
              <img
                src={card.imageUrl}
                alt={card.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            {/* Category and Title */}
            <div className="space-y-4">
              <Badge className="bg-blue-100 text-blue-800 border-0 text-base px-4 py-2">
                {card.category}
              </Badge>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight">
                {card.title}
              </h1>
            </div>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed">
              {card.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {card.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-base font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-3xl p-8">
              <div className="flex items-baseline gap-6">
                <span className="text-4xl font-bold text-blue-600">
                  {card.price ? formatPrice(card.price) : ''}
                </span>
                <span className="text-2xl text-gray-500 line-through">
                  {card.price ? formatPrice(card.price * 1.2) : ''}
                </span>
                <Badge className="bg-red-500 text-white text-base px-3 py-1">
                  -20%
                </Badge>
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <label className="text-lg font-medium text-gray-700">Quantité:</label>
                <div className="flex items-center border-2 border-gray-200 rounded-2xl bg-white">
                  <Button
                    variant="ghost"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-14 h-14 text-gray-600 hover:bg-gray-50"
                  >
                    <span className="text-2xl font-semibold">−</span>
                  </Button>
                  <span className="px-8 py-4 text-center min-w-[100px] text-xl font-semibold text-gray-900 bg-gray-50">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-14 h-14 text-gray-600 hover:bg-gray-50"
                  >
                    <span className="text-2xl font-semibold">+</span>
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  onClick={toggleFavorite}
                  className={`w-16 h-16 border-2 rounded-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
                    isFavorite 
                      ? 'text-red-500 border-red-400 bg-gradient-to-r from-red-50 to-pink-50 shadow-lg' 
                      : 'text-gray-500 border-gray-300 hover:border-red-300 hover:text-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50'
                  }`}
                >
                  <Heart className={`w-8 h-8 transition-all duration-300 ${
                    isFavorite ? 'fill-current scale-110' : ''
                  }`} />
                </Button>
                
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-6 text-xl font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out border-0 h-16"
                >
                  <ShoppingCart className="w-6 h-6 mr-4 transition-transform duration-300 group-hover:scale-110" />
                  Ajouter au panier
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 