"use client";

import * as React from "react";
import { ChevronDown, ArrowUpDown } from "lucide-react";
import { type SortOption } from "@/lib/utils";

interface SortSelectorProps {
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  className?: string;
}

const sortOptions = [
  { value: "name-asc", label: "Nom A-Z", icon: "↑" },
  { value: "name-desc", label: "Nom Z-A", icon: "↓" },
  { value: "price-asc", label: "Prix croissant", icon: "↑" },
  { value: "price-desc", label: "Prix décroissant", icon: "↓" },
  { value: "rating-asc", label: "Note croissante", icon: "↑" },
  { value: "rating-desc", label: "Note décroissante", icon: "↓" },
  { value: "discount-asc", label: "Remise croissante", icon: "↑" },
  { value: "discount-desc", label: "Remise décroissante", icon: "↓" },
] as const;

export function SortSelector({ selectedSort, onSortChange, className = "" }: SortSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = sortOptions.find(option => option.value === selectedSort);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-3 py-2.5 bg-gradient-to-r from-white to-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
          isOpen ? 'shadow-lg border-blue-300 bg-gradient-to-r from-blue-50 to-white' : ''
        }`}
      >
        <div className="flex items-center space-x-1.5">
          <ArrowUpDown className={`w-3.5 h-3.5 transition-colors duration-200 ${
            isOpen ? 'text-blue-500' : 'text-gray-500'
          }`} />
          <span className={`text-xs font-medium transition-colors duration-200 ${
            isOpen ? 'text-blue-700' : 'text-gray-700'
          }`}>
            {selectedOption?.label}
          </span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 transition-all duration-200 ${
          isOpen ? 'text-blue-500 rotate-180' : 'text-gray-500'
        }`} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto backdrop-blur-sm">
          {sortOptions.map((option, index) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value as SortOption);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2.5 text-left text-xs hover:bg-gradient-to-r hover:from-blue-50 hover:to-white transition-all duration-150 flex items-center justify-between ${
                selectedSort === option.value 
                  ? 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 font-medium border-l-2 border-blue-500' 
                  : 'text-gray-700 hover:text-gray-900'
              } ${index === 0 ? 'rounded-t-lg' : ''} ${index === sortOptions.length - 1 ? 'rounded-b-lg' : ''}`}
            >
              <span className="flex items-center space-x-2">
                <span className={`w-1.5 h-1.5 rounded-full ${
                  selectedSort === option.value ? 'bg-blue-500' : 'bg-gray-300'
                }`}></span>
                <span>{option.label}</span>
              </span>
              <span className={`text-xs font-medium ${
                selectedSort === option.value ? 'text-blue-600' : 'text-gray-400'
              }`}>{option.icon}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 