"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ItemCardList } from "@/components/item-card-list";
import { CategoryFilter } from "@/components/category-filter";
import { PriceFilter } from "@/components/price-filter";
import { MarkFilter } from "@/components/mark-filter";
import { TagsFilter } from "@/components/tags-filter";
import { SortSelector } from "@/components/sort-selector";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Filter, X, Search } from "lucide-react";
import { type SortOption, sortItems } from "@/lib/utils";
import { type Item } from "@/lib/types";

// Separate component that uses useSearchParams
function ShopContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Initialize state from URL parameters
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    searchParams.get('category')
  );
  const [items, setItems] = React.useState<Item[]>([]);
  const [categories, setCategories] = React.useState<{ id: string; name: string; count: number }[]>([]);
  const [marks, setMarks] = React.useState<{ id: string; name: string; count: number }[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [minPrice, setMinPrice] = React.useState(
    parseInt(searchParams.get('minPrice') || '0')
  );
  const [maxPrice, setMaxPrice] = React.useState(
    parseInt(searchParams.get('maxPrice') || '2000')
  );
  const [selectedMarks, setSelectedMarks] = React.useState<string[]>(
    searchParams.get('marks') ? searchParams.get('marks')!.split(',') : []
  );
  const [tags, setTags] = React.useState<{ name: string; count: number }[]>([]);
  const [selectedTags, setSelectedTags] = React.useState<string[]>(
    searchParams.get('tags') ? searchParams.get('tags')!.split(',') : []
  );
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState(
    searchParams.get('search') || ""
  );
  const [selectedSort, setSelectedSort] = React.useState<SortOption>(
    (searchParams.get('sort') as SortOption) || "name-asc"
  );

  // Function to update URL with current filter state
  const updateURL = React.useCallback((newParams: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    
    const newURL = `/shop?${params.toString()}`;
    router.replace(newURL, { scroll: false });
  }, [router, searchParams]);

  // Update URL when filters change
  React.useEffect(() => {
    updateURL({
      category: selectedCategory,
      minPrice: minPrice.toString(),
      maxPrice: maxPrice.toString(),
      marks: selectedMarks.length > 0 ? selectedMarks.join(',') : null,
      tags: selectedTags.length > 0 ? selectedTags.join(',') : null,
      search: searchQuery || null,
      sort: selectedSort
    });
  }, [selectedCategory, minPrice, maxPrice, selectedMarks, selectedTags, searchQuery, selectedSort, updateURL]);

  React.useEffect(() => {
    // Fetch items, categories, marks, and tags in parallel
    Promise.all([
      fetch("/api/items").then((res) => res.json()),
      fetch("/api/categories").then((res) => res.json()),
      fetch("/api/marks").then((res) => res.json()),
      fetch("/api/tags").then((res) => res.json())
    ]).then(([itemsData, categoriesData, marksData, tagsData]) => {
      setItems(itemsData);
      
      // Map categories to include counts from items
      const categoryMap = new Map<string, number>();
      itemsData.forEach((item: Item) => {
        // Use the category field for filtering
        const category = item.category || 'uncategorized';
        const count = categoryMap.get(category) || 0;
        categoryMap.set(category, count + 1);
      });
      
      // Create categories with counts
      const categoriesWithCounts = categoriesData.map((cat: { name: string }) => ({
        name: cat.name,
        count: categoryMap.get(cat.name) || 0
      }));
      
      // Map marks to include counts from items
      const markMap = new Map<string, number>();
      itemsData.forEach((item: Item) => {
        const count = markMap.get(item.mark) || 0;
        markMap.set(item.mark, count + 1);
      });
      
      // Create marks with counts
      const marksWithCounts = marksData.map((mark: { name: string }) => ({
        id: mark.name,
        name: mark.name,
        count: markMap.get(mark.name) || 0
      }));
      
      // Map tags to include counts from items
      const tagMap = new Map<string, number>();
      itemsData.forEach((item: Item) => {
        if (item.tags && Array.isArray(item.tags)) {
          item.tags.forEach(tag => {
            const count = tagMap.get(tag) || 0;
            tagMap.set(tag, count + 1);
          });
        }
      });
      
      // Create tags with counts
      const tagsWithCounts = tagsData.map((tag: { name: string }) => ({
        name: tag.name,
        count: tagMap.get(tag.name) || 0
      }));
      
      setCategories(categoriesWithCounts);
      setMarks(marksWithCounts);
      setTags(tagsWithCounts);
      setLoading(false);
    });
  }, []);

  // Compute min/max price from items
  const computedMinPrice = React.useMemo(() => items.length ? Math.min(...items.map(i => i.price)) : 0, [items]);
  const computedMaxPrice = React.useMemo(() => items.length ? Math.max(...items.map(i => i.price)) : 2000, [items]);

  // Update min/max price when data loads (only if not already set from URL)
  React.useEffect(() => {
    if (!loading && items.length > 0) {
      // Only update if the current values are the defaults (0 and 2000)
      // This prevents overriding URL parameters
      if (minPrice === 0 && maxPrice === 2000) {
        setMinPrice(computedMinPrice);
        setMaxPrice(computedMaxPrice);
      }
    }
  }, [loading, items, computedMinPrice, computedMaxPrice, minPrice, maxPrice]);

  // Filtered and sorted items for ItemCardList
  const filteredAndSortedItems = React.useMemo(() => {
    const filtered = items.filter(item => {
      const inCategory = !selectedCategory || item.category === selectedCategory;
      const inPrice = item.price >= minPrice && item.price <= maxPrice;
      const inMark = selectedMarks.length === 0 || selectedMarks.includes(item.mark);
      const inTags = selectedTags.length === 0 || 
        selectedTags.some(tag => item.tags && item.tags.includes(tag));
      const inSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return inCategory && inPrice && inMark && inTags && inSearch;
    });
    
    return sortItems(filtered, selectedSort);
  }, [items, selectedCategory, minPrice, maxPrice, selectedMarks, selectedTags, searchQuery, selectedSort]);

  // Check if any filters are active
  const hasActiveFilters = selectedCategory !== null || 
    minPrice !== computedMinPrice || 
    maxPrice !== computedMaxPrice || 
    selectedMarks.length > 0 || 
    selectedTags.length > 0 || 
    searchQuery !== "" || 
    selectedSort !== "name-asc";

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
      {/* Tags Filter */}
      {!loading && tags.length > 0 && (
        <TagsFilter
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          tags={tags}
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
                    <div className="flex items-center gap-2">
                      {hasActiveFilters && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          Filtres actifs
                        </Badge>
                      )}
                      {searchQuery && (
                        <Badge variant="outline" className="text-xs">
                          Recherche: &quot;{searchQuery}&quot;
                        </Badge>
                      )}
                    </div>
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

// Main component with Suspense boundary
export default function Shop() {
  return (
    <React.Suspense fallback={
      <div className="min-h-screen p-3 md:p-4 lg:p-6 pattern-overlay">
        <div className="w-full max-w-8xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <ShopContent />
    </React.Suspense>
  );
} 