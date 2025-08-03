import { NextResponse } from "next/server";

const categories = [
  {
    id: "A",
    name: "Soins Préventifs",
    createdAt: new Date("2024-01-01").toISOString()
  },
  {
    id: "B", 
    name: "Chirurgie Dentaire",
    createdAt: new Date("2024-01-02").toISOString()
  },
  {
    id: "C",
    name: "Orthodontie",
    createdAt: new Date("2024-01-03").toISOString()
  },
  {
    id: "D",
    name: "Prothèses",
    createdAt: new Date("2024-01-04").toISOString()
  },
  {
    id: "E",
    name: "Services Spécialisés",
    createdAt: new Date("2024-01-05").toISOString()
  }
];

export async function GET() {
  return NextResponse.json(categories);
} 