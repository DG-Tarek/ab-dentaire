"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { CardItem } from "@/components/card-item"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Share2, Star, ShoppingCart, HeartOff } from "lucide-react"
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
             </div>
          </div>

          {/* Right Column - Info and Actions */}
          <div className="space-y-8">
            {/* Title and Description */}
             <div>
               <Badge className="bg-blue-100 text-blue-800 border-0 mb-3">
                 {card.category}
               </Badge>
               <h1 className="text-3xl font-bold text-gray-900 mb-4">{card.title}</h1>
               <p className="text-lg text-gray-600 leading-relaxed mb-4">{card.description}</p>
               
               {/* Tags */}
               <div className="flex flex-wrap gap-2">
                 {card.tags.map((tag, index) => (
                   <span
                     key={index}
                     className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                   >
                     {tag}
                   </span>
               ))}
               </div>
             </div>

                         {/* Price */}
             <div className="bg-gray-50 rounded-2xl px-6 py-3 pl-0">
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
             </div>

                         {/* Quantity and Add to Cart */}
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <label className="text-sm font-medium text-gray-700">Quantité:</label>
                 <div className="flex items-center border border-gray-300 rounded-lg">
                   <Button
                     variant="ghost"
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="w-10 h-10 text-gray-600 hover:bg-gray-100"
                   >
                     -
                   </Button>
                   <span className="px-4 py-2 text-center min-w-[60px] font-medium">{quantity}</span>
                   <Button
                     variant="ghost"
                     onClick={() => setQuantity(quantity + 1)}
                     className="w-10 h-10 text-gray-600 hover:bg-gray-100"
                   >
                     +
                   </Button>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                 <Button
                   variant="outline"
                   onClick={toggleFavorite}
                   className={`w-10 h-10 border-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
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
                   className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 ease-in-out border-0 h-10"
                 >
                   <ShoppingCart className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
                   Ajouter au panier
                 </Button>
               </div>
             </div>

            
          </div>
        </div>
      </div>
    </div>
  )
} 