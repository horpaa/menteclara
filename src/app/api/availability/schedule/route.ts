import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { updateScheduleSchema } from "@/lib/validations/availability";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const schedules = await prisma.weeklySchedule.findMany({ orderBy: { dayOfWeek: "asc" } });
  return NextResponse.json(schedules);
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = updateScheduleSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Replace all schedules
  await prisma.weeklySchedule.deleteMany();
  const schedules = await prisma.weeklySchedule.createMany({
    data: parsed.data.schedules,
  });

  return NextResponse.json({ ok: true, count: schedules.count });
}
