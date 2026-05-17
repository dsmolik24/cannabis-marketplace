import { getStrainBySlug, getInventoryByStrain } from "@/lib/strains";
import { dispensaries } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const strain = getStrainBySlug(slug);

  if (!strain) {
    return Response.json({ error: "Strain not found" }, { status: 404 });
  }

  const strainInventory = getInventoryByStrain(strain.id);
  const inventoryWithDispensary = strainInventory.map((item) => ({
    ...item,
    dispensary: dispensaries.find((d) => d.id === item.dispensaryId),
  }));

  return Response.json({ strain, inventory: inventoryWithDispensary });
}
