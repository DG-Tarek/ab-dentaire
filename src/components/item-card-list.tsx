"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HeartOff, Plus, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

interface Item {
  id: string;
  img: string;
  name: string;
  price: number;
  newPrice: number;
  category: string;
}

// Custom hook to get responsive items per page
function useItemsPerPage() {
  // Always return 9 items per page (3 columns × 3 rows)
  return 9;
}

export function ItemCardList() {
  const router = useRouter();
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = useItemsPerPage();

  React.useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  const toggleFavorite = (name: string) => {
    setFavorites((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(name)) newSet.delete(name);
      else newSet.add(name);
      return newSet;
    });
  };

  const handleAdd = (name: string) => {
    setAdded((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(name)) newSet.add(name);
      return newSet;
    });
    setTimeout(() => {
      setAdded((prev) => {
        const newSet = new Set(prev);
        newSet.delete(name);
        return newSet;
      });
    }, 700);
  };

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageUrl);
      return newSet;
    });
  };

  const handleImageError = (imageUrl: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      newSet.add(imageUrl);
      return newSet;
    });
  };

  const handleCardClick = (itemId: string) => {
    router.push(`/item/${itemId}`);
  };

  // Calculate pagination
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);
  


  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of the card list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
              <div className="p-3 sm:p-4 space-y-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-6">
        {currentItems.map((item, idx) => {
          const isFav = favorites.has(item.name);
          const isAdded = added.has(item.name);
          const isImageLoaded = loadedImages.has(item.img);
          const price = item.price;
          const newPrice = item.newPrice;
          return (
            <Card
              key={idx}
              className="group relative bg-white rounded-xl border-0 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5 flex flex-col cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[3/2]">
                {/* Loading skeleton */}
                {!isImageLoaded && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
                <img
                  src={item.img}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-all duration-500 ${
                    isImageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(item.img)}
                  onError={() => handleImageError(item.img)}
                  loading="lazy"
                />
                
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Favorite Icon - Top Right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item.name);
                  }}
                  className="absolute top-2 right-2 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-md hover:bg-white hover:scale-105 transition-all duration-200 backdrop-blur-sm z-10"
                  aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                >
                  <Heart
                    className={`w-4 h-4 transition-all duration-200 ${
                      isFav 
                        ? "fill-red-500 text-red-500 scale-110" 
                        : "text-gray-500 hover:text-red-400"
                    }`}
                  />
                </button>

                {/* Discount Badge */}
                <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                  -{Math.round(((price - newPrice) / price) * 100)}%
                </div>
              </div>

              {/* Product Content */}
              <CardContent className="p-3 sm:p-4 flex flex-col flex-1">
                {/* Product Name */}
                <h3 className="font-semibold text-xs sm:text-sm text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-200 mb-1">
                  {item.name}
                </h3>
                
                {/* Price and Button Section */}
                <div className="mt-auto flex items-end justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-400 line-through">{price.toLocaleString()} DA</span>
                    <span className="text-sm sm:text-base font-bold text-blue-600">{newPrice.toLocaleString()} DA</span>
                  </div>
                  
                  {/* Cart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAdd(item.name);
                    }}
                    className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full shadow-md transition-all duration-200 transform ${
                      isAdded 
                        ? "bg-green-500 text-white scale-110" 
                        : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105"
                    }`}
                    aria-label="Add to cart"
                  >
                    {isAdded ? (
                      <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
                    )}
                  </button>
                </div>
              </CardContent>

              {/* Hover effect border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300 pointer-events-none"></div>
            </Card>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1 mt-6">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-9 h-9 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                }`}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <div className="text-center text-xs text-gray-500 mt-4">
          Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} items
        </div>
      )}
    </div>
  );
}
