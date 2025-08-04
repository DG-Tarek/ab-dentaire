"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface TagsFilterProps {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  tags: { name: string; count: number }[];
}

export function TagsFilter({ selectedTags, onTagsChange, tags }: TagsFilterProps) {
  const handleTagToggle = (tagName: string) => {
    const newSelectedTags = selectedTags.includes(tagName)
      ? selectedTags.filter(t => t !== tagName)
      : [...selectedTags, tagName];
    onTagsChange(newSelectedTags);
  };

  const handleSelectAll = () => {
    onTagsChange(tags.map(tag => tag.name));
  };

  const handleClearAll = () => {
    onTagsChange([]);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Tags</h3>
        <div className="flex gap-1">
          <button
            onClick={handleSelectAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Tout
          </button>
          <span className="text-gray-300">|</span>
          <button
            onClick={handleClearAll}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Aucun
          </button>
        </div>
      </div>
      
      <div className="space-y-2">
        {tags.map((tag) => (
          <label
            key={tag.name}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedTags.includes(tag.name)}
                onChange={() => handleTagToggle(tag.name)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700">{tag.name}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {tag.count}
            </Badge>
          </label>
        ))}
      </div>
    </div>
  );
} 