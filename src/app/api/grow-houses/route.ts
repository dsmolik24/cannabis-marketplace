import { growHouses, inventory, strains } from "@/lib/strains";

export async function GET() {
  const withStats = growHouses.map((gh) => {
    const ghInventory = inventory.filter((i) => i.growHouseId === gh.id);
    const strainIds = [...new Set(ghInventory.map((i) => i.strainId))];
    return {
      ...gh,
      strainsGrown: strainIds.map((id) => strains.find((s) => s.id === id)),
      dispensaryCount: new Set(ghInventory.map((i) => i.dispensaryId)).size,
      totalUnits: ghInventory.reduce((s, i) => s + i.quantity, 0),
    };
  });

  return Response.json({ growHouses: withStats, total: withStats.length });
}
