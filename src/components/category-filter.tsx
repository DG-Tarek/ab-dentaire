"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: { name: string; count: number }[];
}

export function CategoryFilter({ selectedCategory, onCategoryChange, categories }: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <h3 className="font-semibold text-gray-900 mb-4 text-sm">Catégories</h3>
      <div className="space-y-2">
        {/* All Categories Option */}
        <button
          onClick={() => onCategoryChange(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
            selectedCategory === null
              ? "bg-blue-50 text-blue-700 border border-blue-200"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
        >
          <span>Toutes les catégories</span>
          <Badge variant="secondary" className="text-xs">
            {categories.reduce((sum, cat) => sum + cat.count, 0)}
          </Badge>
        </button>

        {/* Individual Categories */}
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => onCategoryChange(category.name)}
            className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-between ${
              selectedCategory === category.name
                ? "bg-blue-50 text-blue-700 border border-blue-200"
                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span>{category.name}</span>
            <Badge variant="secondary" className="text-xs">
              {category.count}
            </Badge>
          </button>
        ))}
      </div>
    </div>
  );
} 