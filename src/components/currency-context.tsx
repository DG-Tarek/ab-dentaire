"use client";

import * as React from "react";
import { CURRENCY, type Currency, DEFAULT_CURRENCY } from "@/lib/utils";

interface CurrencyContextType {
  selectedCurrency: Currency;
  setSelectedCurrency: (currency: Currency) => void;
}

const CurrencyContext = React.createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = React.useState<Currency>(DEFAULT_CURRENCY);

  // Load currency preference from localStorage on mount
  React.useEffect(() => {
    const savedCurrency = localStorage.getItem('selectedCurrency') as Currency;
    if (savedCurrency && Object.values(CURRENCY).includes(savedCurrency)) {
      setSelectedCurrency(savedCurrency);
    }
  }, []);

  // Save currency preference to localStorage when it changes
  const handleCurrencyChange = React.useCallback((currency: Currency) => {
    setSelectedCurrency(currency);
    localStorage.setItem('selectedCurrency', currency);
  }, []);

  return (
    <CurrencyContext.Provider value={{ 
      selectedCurrency, 
      setSelectedCurrency: handleCurrencyChange 
    }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = React.useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
} 