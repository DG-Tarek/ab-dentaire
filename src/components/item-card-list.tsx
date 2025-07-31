"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, HeartOff, Plus, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useCurrency } from "./currency-context";
import { COMPONENT_SCALING } from "@/lib/responsive-scaling";

interface Item {
  id: string;
  img: string;
  name: string;
  price: number;
  newPrice?: number;
  category: string;
  mark?: string;
  rating?: number;
}

// Custom hook to get responsive items per page
function useItemsPerPage() {
  // Always return 9 items per page (3 columns × 3 rows)
  return 9;
}

interface ItemCardListProps {
  selectedCategory?: string | null;
  items?: Item[];
}

export function ItemCardList({ selectedCategory, items: externalItems }: ItemCardListProps) {
  const router = useRouter();
  const { selectedCurrency } = useCurrency();
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [favorites, setFavorites] = React.useState<Set<string>>(new Set());
  const [added, setAdded] = React.useState<Set<string>>(new Set());
  const [loadedImages, setLoadedImages] = React.useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = useItemsPerPage();

  // If externalItems is provided, use it directly and skip fetching
  React.useEffect(() => {
    if (externalItems) {
      setItems(externalItems);
      setLoading(false);
    } else {
      fetch("/api/items")
        .then((res) => res.json())
        .then((data) => {
          setItems(data);
          setLoading(false);
        });
    }
  }, [externalItems]);

  // Reset to first page when category or items change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, items]);

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

  // If using externalItems, don't filter by category here
  const filteredItems = externalItems
    ? items
    : (selectedCategory ? items.filter(item => item.category === selectedCategory) : items);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  


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
      <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-8">
          {Array.from({ length: 8 }).map((_, idx) => (
            <div key={idx} className="bg-white rounded-lg md:rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="w-full aspect-[3/2] bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse"></div>
              <div className="p-2 md:p-3 lg:p-4 space-y-2">
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
    <div className="max-w-7xl mx-auto px-2 md:px-4 lg:px-0 py-4 md:py-6 lg:py-8">
      {/* Items Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-5 lg:gap-6 mb-6 md:mb-8">
        {currentItems.map((item, idx) => {
          const isFav = favorites.has(item.name);
          const isAdded = added.has(item.name);
          const isImageLoaded = loadedImages.has(item.img);
          const price = item.price;
          const newPrice = item.newPrice;
          return (
            <Card
              key={idx}
              className="group relative bg-white rounded-lg md:rounded-xl border-0 shadow-sm hover:shadow-lg hover:shadow-blue-100/50 transition-all duration-300 overflow-hidden transform hover:-translate-y-0.5 flex flex-col cursor-pointer"
              onClick={() => handleCardClick(item.id)}
            >
                             {/* Product Image */}
               <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 aspect-[4/3] lg:aspect-[3/2]">
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
                   className="absolute top-1 md:top-2 right-1 md:right-2 flex items-center justify-center w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-white/90 shadow-md hover:bg-white hover:scale-105 transition-all duration-200 backdrop-blur-sm z-10"
                   aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
                 >
                   <Heart
                     className={`w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 transition-all duration-200 ${
                       isFav 
                         ? "fill-red-500 text-red-500 scale-110" 
                         : "text-gray-500 hover:text-red-400"
                     }`}
                   />
                 </button>

                                 {/* Discount Badge - Only show if newPrice exists and is different from price */}
                 {newPrice && newPrice < price && (
                   <div className="absolute top-1 md:top-2 left-1 md:left-2 bg-red-600 text-white text-xs md:text-sm lg:text-sm font-bold px-2 md:px-2.5 lg:px-3 py-1 rounded-md shadow-sm">
                     -{Math.round(((price - newPrice) / price) * 100)}%
                   </div>
                 )}
              </div>

              {/* Product Content */}
              <CardContent className="p-2 md:p-3 lg:p-4 flex flex-col flex-1">
                                 {/* Mark Label - Always render to maintain consistent height */}
                 <div className="h-4 md:h-5 lg:h-6 mb-1">
                  {item.mark ? (
                                       <span className="text-gray-400 text-xs md:text-sm lg:text-sm font-semibold block uppercase tracking-wide">
                     {item.mark}
                   </span>
                 ) : (
                   <span className="text-transparent text-xs md:text-sm lg:text-sm font-semibold block uppercase tracking-wide">
                     &nbsp;
                   </span>
                 )}
                </div>
                
                                 {/* Product Name */}
                 <h3 className="font-semibold text-sm md:text-base lg:text-base text-gray-900 line-clamp-3 leading-tight group-hover:text-blue-600 transition-colors duration-200 mb-2">
                   {item.name}
                 </h3>
                
                {/* Price and Button Section */}
                <div className="mt-auto flex items-end justify-between">
                                     <div className="flex flex-col">
                                         {newPrice && newPrice < price ? (
                       <>
                         <span className="text-xs md:text-sm lg:text-sm text-gray-400 line-through">{formatPrice(price, selectedCurrency)}</span>
                         <span className="text-sm md:text-base lg:text-base font-bold text-blue-600">{formatPrice(newPrice, selectedCurrency)}</span>
                       </>
                     ) : (
                       <span className="text-sm md:text-base lg:text-base font-bold text-gray-900">{formatPrice(price, selectedCurrency)}</span>
                     )}
                  </div>
                  
                                     {/* Cart Button */}
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       handleAdd(item.name);
                     }}
                     className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full shadow-md transition-all duration-200 transform ${
                       isAdded 
                         ? "bg-green-500 text-white scale-110" 
                         : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:scale-105"
                     }`}
                     aria-label="Add to cart"
                   >
                     {isAdded ? (
                       <div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                     ) : (
                       <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
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
         <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
           <button
             onClick={goToPreviousPage}
             disabled={currentPage === 1}
             className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
             aria-label="Previous page"
           >
             <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
           </button>
           
           <div className="flex items-center gap-2">
             {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
               <button
                 key={page}
                 onClick={() => goToPage(page)}
                 className={`w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg border text-sm md:text-base lg:text-lg font-medium transition-all duration-200 ${
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
             className="flex items-center justify-center w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-lg border border-gray-200 bg-white text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 shadow-sm"
             aria-label="Next page"
           >
             <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
           </button>
         </div>
       )}
             {/* Page Info */}
       <div className="text-center text-sm md:text-base lg:text-lg text-gray-500 mt-4 md:mt-6">
         Page {currentPage} of {totalPages} • Showing {startIndex + 1}-{Math.min(endIndex, filteredItems.length)} of {filteredItems.length} items
       </div>
    </div>
  );
}
