"use client";

import * as React from "react";
import { ArrowUpDown } from "lucide-react";
import { type SortOption } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  return (
    <Select value={selectedSort} onValueChange={(value) => onSortChange(value as SortOption)}>
      <SelectTrigger className={className}>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <SelectValue placeholder="Trier par..." />
        </div>
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center justify-between w-full">
              <span>{option.label}</span>
              <span className="text-xs text-gray-400 ml-2">{option.icon}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 