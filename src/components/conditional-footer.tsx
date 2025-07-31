"use client"

import { usePathname } from "next/navigation";
import { ContactUsFooter } from "./contact-us-footer";
import { BottomNavigation } from "./bottom-navigation";

export function ConditionalFooter() {
  const pathname = usePathname();
  const isItemDetailsPage = pathname?.startsWith('/item/');

  // Don't render the footer and bottom navigation on item details pages
  if (isItemDetailsPage) {
    return null;
  }

  return (
    <>
      <ContactUsFooter />
      <BottomNavigation />
    </>
  );
} 