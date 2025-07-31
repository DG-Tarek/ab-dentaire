"use client"

import { usePathname } from "next/navigation";
import { Header } from "./header";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isItemDetailsPage = pathname?.startsWith('/item/');

  // Don't render the header on item details pages
  if (isItemDetailsPage) {
    return null;
  }

  return <Header />;
} 