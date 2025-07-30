"use client";

import * as React from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
}

export function PriceFilter({ minPrice, maxPrice, onPriceChange }: PriceFilterProps) {
  const [localMinPrice, setLocalMinPrice] = React.useState(minPrice);
  const [localMaxPrice, setLocalMaxPrice] = React.useState(maxPrice);

  React.useEffect(() => {
    setLocalMinPrice(minPrice);
    setLocalMaxPrice(maxPrice);
  }, [minPrice, maxPrice]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMinPrice(value);
    if (value <= localMaxPrice) {
      onPriceChange(value, localMaxPrice);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMaxPrice(value);
    if (value >= localMinPrice) {
      onPriceChange(localMinPrice, value);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-4 text-sm">Prix</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Min: {localMinPrice}€</span>
          <span>Max: {localMaxPrice}€</span>
        </div>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Prix minimum</label>
            <input
              type="range"
              min={0}
              max={1500}
              value={localMinPrice}
              onChange={handleMinPriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Prix maximum</label>
            <input
              type="range"
              min={0}
              max={1500}
              value={localMaxPrice}
              onChange={handleMaxPriceChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPriceChange(0, 1500)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
} 