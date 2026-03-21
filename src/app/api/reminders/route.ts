import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { sendPendingReminders } from "@/lib/reminders";

export async function POST(req: NextRequest) {
  // Acepta sesión admin O cron secret
  const session = await auth();
  const secret = req.headers.get("x-cron-secret");
  const validSecret = secret === process.env.NEXTAUTH_SECRET;

  if (!session && !validSecret) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const results = await sendPendingReminders();
  const sent = results.filter((r: PromiseSettledResult<unknown>) => r.status === "fulfilled").length;
  const failed = results.filter((r: PromiseSettledResult<unknown>) => r.status === "rejected").length;

  return NextResponse.json({ sent, failed });
}
