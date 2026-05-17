import { dispensaries } from "@/lib/data";

export async function GET() {
  return Response.json({ dispensaries, total: dispensaries.length });
}
