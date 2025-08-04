import { NextResponse } from "next/server";

const tags = [
  { "name": "A" },
  { "name": "B" },
  { "name": "C" },
  { "name": "D" },
  { "name": "E" }
];

export async function GET() {
  return NextResponse.json(tags);
} 