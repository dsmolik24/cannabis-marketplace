import { NextRequest } from "next/server";
import { products } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const strain = searchParams.get("strain");

  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }
  if (strain) {
    filtered = filtered.filter((p) => p.strain === strain);
  }

  return Response.json({ products: filtered, total: filtered.length });
}
