import { getDispensaryBySlug, getProductsByDispensary } from "@/lib/data";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const dispensary = getDispensaryBySlug(slug);

  if (!dispensary) {
    return Response.json({ error: "Dispensary not found" }, { status: 404 });
  }

  const products = getProductsByDispensary(dispensary.id);

  return Response.json({ dispensary, products });
}
