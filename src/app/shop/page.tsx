"use client";

import * as React from "react";
import { ItemCardList } from "@/components/item-card-list";
import { CategoryFilter } from "@/components/category-filter";
import { PriceFilter } from "@/components/price-filter";
import { MarkFilter } from "@/components/mark-filter";
import { SortSelector } from "@/components/sort-selector";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter, X, Search } from "lucide-react";
import { type SortOption, sortItems } from "@/lib/utils";

interface Item {
  id: string;
  img: string;
  name: string;
  description: string;
  price: number;
  newPrice: number;
  category: string;
  mark?: string;
  rating?: number;
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(2000);
  const [selectedMarks, setSelectedMarks] = React.useState<string[]>([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState<SortOption>("name-asc");

  React.useEffect(() => {
    fetch("/api/items")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
  }, []);

  // Get unique categories with counts
  const categories = React.useMemo(() => {
    const categoryMap = new Map<string, number>();
    items.forEach(item => {
      const count = categoryMap.get(item.category) || 0;
      categoryMap.set(item.category, count + 1);
    });
    return Array.from(categoryMap.entries()).map(([id, count]) => ({
      id,
      name: `Catégorie ${id}`,
      count
    }));
  }, [items]);

  // Get unique marks with counts
  const marks = React.useMemo(() => {
    const markMap = new Map<string, number>();
    items.forEach(item => {
      if (item.mark) {
        const count = markMap.get(item.mark) || 0;
        markMap.set(item.mark, count + 1);
      }
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
      const inCategory = !selectedCategory || item.category === selectedCategory;
      const inPrice = item.price >= minPrice && item.price <= maxPrice;
      const inMark = selectedMarks.length === 0 || (item.mark && selectedMarks.includes(item.mark));
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
    <div className="min-h-screen p-6 pattern-overlay">
      <div className="w-full max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
                     {/* Mobile Filter Button */}
           <div className="lg:hidden mb-6">
            <Drawer open={isMobileDrawerOpen} onOpenChange={setIsMobileDrawerOpen}>
              <DrawerTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filtres</span>
                </button>
              </DrawerTrigger>
              <DrawerContent direction="left" className="bg-white">
                <div className="p-4 h-full overflow-y-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Filtres</h2>
                    <button
                      onClick={() => setIsMobileDrawerOpen(false)}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                  <FilterComponents />
                </div>
              </DrawerContent>
            </Drawer>
          </div>

          {/* Desktop Sidebar Filters */}
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <FilterComponents />
          </div>
          
          {/* Items List */}
          <div className="flex-1">
                         {/* Search, Sort, and Results Container */}
             <div className="mb-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl border border-gray-200 shadow-sm p-4 mx-2 sm:mx-2 lg:mx-3">
              {/* Primary Controls Row */}
              <div className="flex flex-col sm:flex-row gap-4 mb-3">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un service dentaire..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:shadow-md focus:shadow-lg placeholder-gray-400 text-gray-900"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                {/* Sort Selector */}
                <div className="w-full sm:w-62 h-10">
                  <SortSelector
                    selectedSort={selectedSort}
                    onSortChange={setSelectedSort}
                  />
                </div>
              </div>
              
              {/* Results Count */}
              <div className="text-sm text-gray-500 border-t border-gray-100 pt-3">
                {filteredAndSortedItems.length} service{filteredAndSortedItems.length !== 1 ? 's' : ''} trouvé{filteredAndSortedItems.length !== 1 ? 's' : ''}
              </div>
            </div>
            
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