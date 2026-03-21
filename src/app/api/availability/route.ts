import { NextRequest, NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/availability";
import { addDays } from "date-fns";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const fromParam = searchParams.get("from");
  const toParam = searchParams.get("to");

  const from = fromParam ? new Date(fromParam) : new Date();
  const to = toParam ? new Date(toParam) : addDays(new Date(), 30);

  try {
    const slots = await getAvailableSlots(from, to);
    return NextResponse.json(slots);
  } catch {
    return NextResponse.json({ error: "Error al calcular disponibilidad" }, { status: 500 });
  }
}
