"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";

interface MarkFilterProps {
  selectedMarks: string[];
  onMarkChange: (marks: string[]) => void;
  marks: { id: string; name: string; count: number }[];
}

export function MarkFilter({ selectedMarks, onMarkChange, marks }: MarkFilterProps) {
  const handleMarkToggle = (markId: string) => {
    const newSelectedMarks = selectedMarks.includes(markId)
      ? selectedMarks.filter(id => id !== markId)
      : [...selectedMarks, markId];
    onMarkChange(newSelectedMarks);
  };

  const handleSelectAll = () => {
    onMarkChange(marks.map(mark => mark.id));
  };

  const handleClearAll = () => {
    onMarkChange([]);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 text-sm">Marques</h3>
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
        {marks.map((mark) => (
          <label
            key={mark.id}
            className="flex items-center justify-between cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
          >
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedMarks.includes(mark.id)}
                onChange={() => handleMarkToggle(mark.id)}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
              />
              <span className="text-sm text-gray-700">{mark.name}</span>
            </div>
            <Badge variant="secondary" className="text-xs">
              {mark.count}
            </Badge>
          </label>
        ))}
      </div>
    </div>
  );
} 