"use client";

import * as React from "react";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  currentMin: number;
  currentMax: number;
  onPriceChange: (min: number, max: number) => void;
}

export function PriceFilter({ minPrice, maxPrice, currentMin, currentMax, onPriceChange }: PriceFilterProps) {
  const [localMinPrice, setLocalMinPrice] = React.useState(currentMin);
  const [localMaxPrice, setLocalMaxPrice] = React.useState(currentMax);

  React.useEffect(() => {
    setLocalMinPrice(currentMin);
    setLocalMaxPrice(currentMax);
  }, [currentMin, currentMax]);

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMinPrice(value);
    onPriceChange(value, localMaxPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setLocalMaxPrice(value);
    onPriceChange(localMinPrice, value);
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
              min={minPrice}
              max={maxPrice}
              value={localMinPrice}
              onChange={handleMinPriceChange}
              onInput={handleMinPriceChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((localMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb ${((localMinPrice - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
          
          <div>
            <label className="block text-xs text-gray-500 mb-1">Prix maximum</label>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={localMaxPrice}
              onChange={handleMaxPriceChange}
              onInput={handleMaxPriceChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #0ea5e9 0%, #0ea5e9 ${((localMaxPrice - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb ${((localMaxPrice - minPrice) / (maxPrice - minPrice)) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPriceChange(minPrice, maxPrice)}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  );
} 