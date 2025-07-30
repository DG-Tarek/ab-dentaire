"use client";

import * as React from "react";
import { ItemCardList } from "@/components/item-card-list";
import { CategoryFilter } from "@/components/category-filter";
import { PriceFilter } from "@/components/price-filter";
import { MarkFilter } from "@/components/mark-filter";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Filter, X } from "lucide-react";

interface Item {
  id: string;
  img: string;
  name: string;
  price: number;
  newPrice: number;
  category: string;
  mark?: string;
}

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [items, setItems] = React.useState<Item[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(1500);
  const [selectedMarks, setSelectedMarks] = React.useState<string[]>([]);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = React.useState(false);

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
  const computedMaxPrice = React.useMemo(() => items.length ? Math.max(...items.map(i => i.price)) : 1500, [items]);

  // Filtered items for ItemCardList
  const filteredItems = React.useMemo(() => {
    return items.filter(item => {
      const inCategory = !selectedCategory || item.category === selectedCategory;
      const inPrice = item.price >= minPrice && item.price <= maxPrice;
      const inMark = selectedMarks.length === 0 || (item.mark && selectedMarks.includes(item.mark));
      return inCategory && inPrice && inMark;
    });
  }, [items, selectedCategory, minPrice, maxPrice, selectedMarks]);

  // Filter components
  const FilterComponents = () => (
    <div className="space-y-4">
      {/* Price Filter */}
      {!loading && (
        <PriceFilter
          minPrice={computedMinPrice}
          maxPrice={computedMaxPrice}
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
    <div className="min-h-screen p-4 pattern-overlay">
      <div className="w-full max-w-8xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="lg:hidden mb-4">
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
            <ItemCardList
              selectedCategory={selectedCategory}
              items={filteredItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 