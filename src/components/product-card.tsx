"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  img: string;
  name: string;
  description?: string;
  price: number;
  newPrice: number;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
  isInCart?: boolean;
}

export function ProductCard({
  img,
  name,
  description,
  price,
  newPrice,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  isInCart = false,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <Card className="w-full max-w-xs sm:w-72 card-elevated rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      {/* Product Image */}
      <div className="relative w-full">
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="w-full h-48 sm:h-56 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Product Image */}
        <img
          src={img}
          alt={name}
          className={`w-full h-48 sm:h-56 object-cover transition-all duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />

        {/* Favorite Button - Top Right */}
        {onToggleFavorite && (
          <button
            onClick={onToggleFavorite}
            className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm hover:bg-white hover:scale-110 transition-all duration-200"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                isFavorite 
                  ? "fill-red-500 text-red-500 scale-110" 
                  : "text-gray-400 hover:text-red-400"
              }`}
              fill={isFavorite ? "#ef4444" : "none"}
            />
          </button>
        )}

        {/* Error placeholder */}
        {imageError && (
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <div className="text-gray-400 text-sm">Image not available</div>
          </div>
        )}
      </div>

      {/* Product Content */}
      <CardContent className="p-4 sm:p-5 flex flex-col h-full">
        {/* Product Name */}
        <h3 className="font-bold text-base sm:text-lg mb-2 text-gray-900 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* Description (Optional) */}
        {description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* Price Information */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-400 line-through">
            {price} DA
          </span>
          <span className="text-lg sm:text-xl font-bold text-blue-600">
            {newPrice} DA
          </span>
        </div>

        {/* Action Buttons */}
        <div className="mt-auto flex gap-2">
          {/* Add to Cart Button */}
          {onAddToCart && (
            <button
              onClick={onAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors duration-200"
              aria-label="Add to cart"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">Add to Cart</span>
              <span className="sm:hidden">Add</span>
            </button>
          )}

          {/* Favorite Button (Alternative position) */}
          {onToggleFavorite && (
            <button
              onClick={onToggleFavorite}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-200 ${
                  isFavorite 
                    ? "fill-red-500 text-red-500" 
                    : "text-gray-400"
                }`}
                fill={isFavorite ? "#ef4444" : "none"}
              />
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 