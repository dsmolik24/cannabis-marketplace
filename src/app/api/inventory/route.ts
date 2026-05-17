import { NextRequest } from "next/server";
import { inventory, strains } from "@/lib/strains";
import { dispensaries } from "@/lib/data";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const dispensaryId = searchParams.get("dispensary");
  const status = searchParams.get("status");
  const strainId = searchParams.get("strain");

  let filtered = inventory;

  if (dispensaryId) {
    filtered = filtered.filter((i) => i.dispensaryId === dispensaryId);
  }
  if (status) {
    filtered = filtered.filter((i) => i.status === status);
  }
  if (strainId) {
    filtered = filtered.filter((i) => i.strainId === strainId);
  }

  const enriched = filtered.map((item) => ({
    ...item,
    strain: strains.find((s) => s.id === item.strainId),
    dispensary: dispensaries.find((d) => d.id === item.dispensaryId),
  }));

  return Response.json({
    inventory: enriched,
    total: enriched.length,
    totalUnits: enriched.reduce((s, i) => s + i.quantity, 0),
  });
}
