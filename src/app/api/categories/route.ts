import { NextResponse } from "next/server";

const categories = [
  {
    name: "Soins Préventifs"
  },
  {
    name: "Chirurgie Dentaire"
  },
  {
    name: "Orthodontie"
  },
  {
    name: "Prothèses"
  },
  {
    name: "Services Spécialisés"
  }
];

export async function GET() {
  return NextResponse.json(categories);
} 