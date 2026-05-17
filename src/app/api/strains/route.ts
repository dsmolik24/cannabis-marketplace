import { NextRequest } from "next/server";
import { strains, inventory } from "@/lib/strains";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type = searchParams.get("type");

  let filtered = strains;
  if (type) {
    filtered = filtered.filter((s) => s.type === type);
  }

  const withInventory = filtered.map((strain) => {
    const strainInventory = inventory.filter((i) => i.strainId === strain.id);
    const available = strainInventory.filter(
      (i) => i.status === "available" || i.status === "low-stock"
    );
    return {
      ...strain,
      totalUnits: available.reduce((s, i) => s + i.quantity, 0),
      lowestPrice: available.length
        ? Math.min(...available.map((i) => i.price))
        : null,
      dispensaryCount: new Set(available.map((i) => i.dispensaryId)).size,
    };
  });

  return Response.json({ strains: withInventory, total: withInventory.length });
}
