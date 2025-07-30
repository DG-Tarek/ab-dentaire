"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { Button } from "./ui/button"
import { Star, Calendar, Tag } from "lucide-react"
import { Card as CardType } from "@/lib/data"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { formatPrice } from "@/lib/utils"
import { useCurrency } from "./currency-context"

interface CardItemProps {
  card: CardType
  className?: string
}

export function CardItem({ card, className }: CardItemProps) {
  const router = useRouter()
  const { selectedCurrency } = useCurrency()

  const handleCardClick = () => {
    router.push(`/item/${card.id}`)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col ${className}`}
      onClick={handleCardClick}
    >
      <CardHeader className="pb-1 px-2 pt-2 flex-1">
        <div className="relative w-full h-32 mb-2 overflow-hidden rounded-lg">
          <Image
            src={card.imageUrl}
            alt={card.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              console.error('Image failed to load:', card.imageUrl)
              // Fallback to a placeholder
              const target = e.target as HTMLImageElement
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzIyNS42ODUgMTUwIDI0Ni42NjcgMTI5LjAxOCAyNDYuNjY3IDEwMy4zMzNDMjQ2LjY2NyA3Ny42NDg3IDIyNS42ODUgNTYuNjY2NyAyMDAgNTYuNjY2N0MxNzQuMzE1IDU2LjY2NjcgMTUzLjMzMyA3Ny42NDg3IDE1My4zMzMgMTAzLjMzM0MxNTMuMzMzIDEyOS4wMTggMTc0LjMxNSAxNTAgMjAwIDE1MFoiIGZpbGw9IiNEMzM3QjAiLz4KPHBhdGggZD0iTTEwMCAyNDAuMzMzQzEwMCAyMTQuNjQ5IDEyMS4wMDIgMTkzLjY2NyAxNDYuNjY3IDE5My42NjdIMjUzLjMzM0MyNzguOTk4IDE5My42NjcgMzAwIDIxNC42NDkgMzAwIDI0MC4zMzNWMjUwQzMwMCAyNzUuNjg1IDI3OC45OTggMjk2LjY2NyAyNTMuMzMzIDI5Ni42NjdIMTQ2LjY2N0MxMjEuMDAyIDI5Ni42NjcgMTAwIDI3NS42ODUgMTAwIDI1MFYyNDAuMzMzWiIgZmlsbD0iI0QzMzdCMCIvPgo8L3N2Zz4K'
            }}
          />
          <div className="absolute top-1 right-1">
            <Badge 
              variant={card.status === 'active' ? 'default' : 'secondary'}
              className="text-xs"
            >
              {card.status === 'active' ? 'Actif' : card.status === 'inactive' ? 'Inactif' : 'Brouillon'}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 px-2 flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className="text-xs">
            {card.category}
          </Badge>
          {card.rating && (
            <div className="flex items-center space-x-1 text-xs text-gray-600">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{card.rating}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1 mb-1">
          {card.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {card.tags.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{card.tags.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-start justify-between mb-1">
          <CardTitle className="text-xs sm:text-sm leading-tight">{card.title}</CardTitle>
          {card.price && (
            <div className="text-right">
              <div className="text-xs sm:text-sm font-bold text-blue-600">{formatPrice(card.price, selectedCurrency)}</div>
            </div>
          )}
        </div>
        
        <CardDescription className="line-clamp-1 text-xs">
          {card.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="pt-0 px-2 pb-2">
        <div className="flex items-center justify-between w-full text-xs text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>{formatDate(card.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="w-3 h-3" />
            <span>{card.tags.length} tags</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
} 