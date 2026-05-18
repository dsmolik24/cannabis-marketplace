import {
  getGrowHouseBySlug,
  getInventoryByGrowHouse,
  strains,
} from "@/lib/strains";
import { dispensaries } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const growHouse = getGrowHouseBySlug(slug);

  if (!growHouse) {
    return Response.json({ error: "Grow house not found" }, { status: 404 });
  }

  const ghInventory = getInventoryByGrowHouse(growHouse.id);
  const enriched = ghInventory.map((item) => ({
    ...item,
    strain: strains.find((s) => s.id === item.strainId),
    dispensary: dispensaries.find((d) => d.id === item.dispensaryId),
  }));

  return Response.json({ growHouse, inventory: enriched });
}
