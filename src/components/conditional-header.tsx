"use client"

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isItemDetailsPage = pathname?.startsWith('/item/');
  const isCartPage = pathname === '/cart';

  // Don't render the header on item details pages or cart page
  if (isItemDetailsPage || isCartPage) {
    return null;
  }

  return <Header />;
} 