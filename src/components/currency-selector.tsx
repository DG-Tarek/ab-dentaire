"use client";

import * as React from "react";
import { CURRENCY, type Currency } from "@/lib/utils";

interface CurrencySelectorProps {
  selectedCurrency: Currency;
  onCurrencyChange: (currency: Currency) => void;
  className?: string;
}

export function CurrencySelector({ 
  selectedCurrency, 
  onCurrencyChange, 
  className = "" 
}: CurrencySelectorProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <label className="text-sm font-medium text-gray-700">Devise:</label>
      <select
        value={selectedCurrency}
        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value={CURRENCY.DZD}>DA (Dinar Algérien)</option>
        <option value={CURRENCY.EUR}>€ (Euro)</option>
        <option value={CURRENCY.USD}>$ (Dollar US)</option>
      </select>
    </div>
  );
} 