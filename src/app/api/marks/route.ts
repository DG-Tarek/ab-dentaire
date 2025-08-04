import { NextResponse } from "next/server";

const marks = [
  {
    name: "Premium"
  },
  {
    name: "Standard"
  },
  {
    name: "Basic"
  },
  {
    name: "Luxury"
  }
];

export async function GET() {
  return NextResponse.json(marks);
} 