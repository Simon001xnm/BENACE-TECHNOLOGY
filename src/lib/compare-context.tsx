'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Laptop } from '@/lib/types';

interface CompareContextType {
  compareItems: Laptop[];
  addToCompare: (product: Laptop) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: boolean;
  setIsComparing: (val: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<Laptop[]>([]);
  const [isComparing, setIsComparing] = useState(false);

  const addToCompare = useCallback((product: Laptop) => {
    setCompareItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      if (prev.length >= 4) return prev; // Limit to 4 for UX clarity
      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareItems([]);
    setIsComparing(false);
  }, []);

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing,
        setIsComparing,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
