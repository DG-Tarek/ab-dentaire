"use client";

import * as React from "react";
import { ItemCardList } from "@/components/item-card-list";
import { CategoryFilter } from "@/components/category-filter";
import { PriceFilter } from "@/components/price-filter";
import { MarkFilter } from "@/components/mark-filter";
import { SortSelector } from "@/components/sort-selector";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Search, ArrowUpDown } from "lucide-react";
import { type SortOption, sortItems } from "@/lib/utils";


interface Item {
  id?: string;              // Firestore document ID (auto-generated)
  ref: string;              // Unique product reference code
  image: string;            // URL to product image
  name: string;             // Product name
  description: string;      // Product description
  mark: string;             // Brand or manufacturer
  price: number;            // Original price
  new_price?: number;       // Discounted price, optional if not on sale
  stock: number;            // Available stock quantity
  tags: string[];           // List of keywords or categories
  createdAt?: Date;         // Timestamp for creation
  updatedAt?: Date;         // Timestamp for last update
}

interface CartItem {
  itemId: string;            // Firestore Item document ID
  ref: string;               // Product reference code
  name: string;              // Product name
  image: string;             // Product image URL
  price: number;             // Price per unit (original or discounted)
  quantity: number;          // Quantity selected
  subtotal: number;          // price * quantity (calculated at time of checkout)
}

interface Cart {
  userId?: string;           // Optional user ID (for logged-in users)
  items: CartItem[];         // List of products to buy
  total: number;             // Total cost = sum of subtotals
  createdAt: Date;           // Cart creation time (or start of checkout)
  updatedAt?: Date;          // Last update (e.g. added/removed items)
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [categories, setCategories] = React.useState<{ id: string; name: string; count: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(2000);
  const [selectedMarks, setSelectedMarks] = React.useState<string[]>([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState<SortOption>("name-asc");

  React.useEffect(() => {
    // Fetch items and categories in parallel
    Promise.all([
      fetch("/api/items").then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json())
    ]).then(([itemsData, categoriesData]) => {
      setItems(itemsData);
      
      // Map categories to include counts from items
      const categoryMap = new Map<string, number>();
      itemsData.forEach((item: Item) => {
        // Use the first tag as the primary category for filtering
        const primaryCategory = item.tags[0] || 'uncategorized';
        const count = categoryMap.get(primaryCategory) || 0;
        categoryMap.set(primaryCategory, count + 1);
      });
      
      // Create categories with counts
      const categoriesWithCounts = categoriesData.map((cat: { id: string; name: string }) => ({
        id: cat.id,
        name: cat.name,
        count: categoryMap.get(cat.id) || 0
      }));
      
      setCategories(categoriesWithCounts);
      setLoading(false);
    });
  }, []);



  // Get unique marks with counts
  const marks = React.useMemo(() => {
    const markMap = new Map<string, number>();
    items.forEach(item => {
      const count = markMap.get(item.mark) || 0;
      markMap.set(item.mark, count + 1);
    });
    return Array.from(markMap.entries()).map(([id, count]) => ({
      id,
      name: id,
      count
    }));
  }, [items]);

  // Compute min/max price from items
  const computedMinPrice = React.useMemo(() => items.length ? Math.min(...items.map(i => i.price)) : 0, [items]);
  const computedMaxPrice = React.useMemo(() => items.length ? Math.max(...items.map(i => i.price)) : 2000, [items]);

  // Update min/max price when data loads
  React.useEffect(() => {
    if (!loading && items.length > 0) {
      setMinPrice(computedMinPrice);
      setMaxPrice(computedMaxPrice);
    }
  }, [loading, items, computedMinPrice, computedMaxPrice]);



  // Filtered and sorted items for ItemCardList
  const filteredAndSortedItems = React.useMemo(() => {
    const filtered = items.filter(item => {
      const inCategory = !selectedCategory || item.tags.includes(selectedCategory);
      const inPrice = item.price >= minPrice && item.price <= maxPrice;
      const inMark = selectedMarks.length === 0 || selectedMarks.includes(item.mark);
      const inSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return inCategory && inPrice && inMark && inSearch;
    });
    
    return sortItems(filtered, selectedSort);
  }, [items, selectedCategory, minPrice, maxPrice, selectedMarks, searchQuery, selectedSort]);

  // Filter components
  const FilterComponents = () => (
    <div className="space-y-4">
      {/* Price Filter */}
      {!loading && (
        <PriceFilter
          minPrice={0}
          maxPrice={2000}
          currentMin={minPrice}
          currentMax={maxPrice}
          onPriceChange={(min, max) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
        />
      )}
      {/* Category Filter */}
      {!loading && (
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />
      )}
      {/* Mark Filter */}
      {!loading && marks.length > 0 && (
        <MarkFilter
          selectedMarks={selectedMarks}
          onMarkChange={setSelectedMarks}
          marks={marks}
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen p-3 md:p-4 lg:p-6 pattern-overlay">
      <div className="w-full max-w-8xl mx-auto">
                 <div className="flex flex-col lg:flex-row gap-3 md:gap-6 lg:gap-8">

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <FilterComponents />
          </div>
          
                                           {/* Items List */}
            <div className="flex-1">
              {/* Search, Sort, and Results Container */}
              <Card className="mb-0">
                <CardContent className="space-y-4 pt-6">
                                     {/* Primary Controls Row */}
                   <div className="flex flex-col md:flex-row gap-4">
                     {/* Search Input */}
                     <div className="flex-1 relative">
                       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                       <Input
                         type="text"
                         placeholder="Rechercher un service dentaire..."
                         value={searchQuery}
                         onChange={(e) => setSearchQuery(e.target.value)}
                         className="pl-10 pr-10"
                       />
                       {searchQuery && (
                         <button
                           onClick={() => setSearchQuery("")}
                           className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors w-8 h-8 flex items-center justify-center"
                         >
                           <X className="w-4 h-4" />
                         </button>
                       )}
                     </div>
                     
                     {/* Sort and Filter Row */}
                     <div className="flex gap-2">
                       {/* Sort Selector */}
                       <div className="flex-1 md:w-64">
                         <SortSelector
                           selectedSort={selectedSort}
                           onSortChange={setSelectedSort}
                         />
                       </div>
                       
                       {/* Mobile Filter Button */}
                       <div className="md:hidden">
                         <Drawer open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
                           <DrawerTrigger asChild>
                             <button className="flex items-center gap-2 px-3 py-2 bg-white rounded-md border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors h-10">
                               <Filter className="w-4 h-4" />
                             </button>
                           </DrawerTrigger>
                           <DrawerContent direction="left" className="bg-white">
                             <div className="p-4 h-full overflow-y-auto">
                               <div className="flex items-center justify-between mb-4">
                                 <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
                                 <button
                                   onClick={() => setIsMobileDrawerOpen(false)}
                                   className="p-2 hover:bg-gray-100 rounded-lg transition-colors w-8 h-8 flex items-center justify-center"
                                 >
                                   <X className="w-4 h-4 text-gray-500" />
                                 </button>
                               </div>
                               <FilterComponents />
                             </div>
                           </DrawerContent>
                         </Drawer>
                       </div>
                     </div>
                   </div>
                  
                  <Separator />
                  
                  {/* Results Count */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-sm">
                        {filteredAndSortedItems.length}
                      </Badge>
                      <span className="text-sm text-gray-600">
                        service{filteredAndSortedItems.length !== 1 ? 's' : ''} trouvé{filteredAndSortedItems.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                    {searchQuery && (
                      <Badge variant="outline" className="text-xs">
                        Recherche: &quot;{searchQuery}&quot;
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            
            <ItemCardList
              selectedCategory={selectedCategory}
              items={filteredAndSortedItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 