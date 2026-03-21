import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const noteSchema = z.object({
  appointmentId: z.string(),
  content: z.string().min(1),
  objectives: z.string().optional(),
  nextSteps: z.string().optional(),
});

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const notes = await prisma.sessionNote.findMany({
    where: { patientId: params.id },
    orderBy: { createdAt: "desc" },
    include: { appointment: { select: { startsAt: true, type: true } } },
  });

  return NextResponse.json(notes);
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = noteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const note = await prisma.sessionNote.create({
    data: {
      patientId: params.id,
      appointmentId: parsed.data.appointmentId,
      content: parsed.data.content,
      objectives: parsed.data.objectives,
      nextSteps: parsed.data.nextSteps,
    },
  });

  return NextResponse.json(note, { status: 201 });
}
