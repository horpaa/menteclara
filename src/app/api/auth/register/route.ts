import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, password, phone } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Ya existe una cuenta con este email" }, { status: 409 });
    }

    const existingPatient = await prisma.patient.findUnique({ where: { email } });
    if (existingPatient) {
      return NextResponse.json({ error: "Ya existe un paciente registrado con este email" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        email,
        password: hashed,
        role: "PATIENT",
        patient: {
          create: {
            firstName,
            lastName,
            email,
            phone: phone || null,
          },
        },
      },
    });

    return NextResponse.json({ id: user.id }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
