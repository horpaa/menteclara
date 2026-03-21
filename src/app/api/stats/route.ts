import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { startOfMonth, subMonths, format } from "date-fns";
import { es } from "date-fns/locale";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayEnd = new Date(today);
  todayEnd.setHours(23, 59, 59, 999);

  const [total, pending, confirmed, completed, totalPatients, todayCount] =
    await Promise.all([
      prisma.appointment.count(),
      prisma.appointment.count({ where: { status: "PENDING" } }),
      prisma.appointment.count({ where: { status: "CONFIRMED" } }),
      prisma.appointment.count({ where: { status: "COMPLETED" } }),
      prisma.patient.count(),
      prisma.appointment.count({ where: { startsAt: { gte: today, lte: todayEnd } } }),
    ]);

  // Monthly data for last 6 months
  const monthlyData = await Promise.all(
    Array.from({ length: 6 }).map(async (_, i) => {
      const monthStart = startOfMonth(subMonths(new Date(), 5 - i));
      const monthEnd = new Date(monthStart);
      monthEnd.setMonth(monthEnd.getMonth() + 1);

      const [monthTotal, monthCompleted] = await Promise.all([
        prisma.appointment.count({ where: { startsAt: { gte: monthStart, lt: monthEnd } } }),
        prisma.appointment.count({
          where: { startsAt: { gte: monthStart, lt: monthEnd }, status: "COMPLETED" },
        }),
      ]);

      return {
        month: format(monthStart, "MMM", { locale: es }),
        total: monthTotal,
        completed: monthCompleted,
      };
    })
  );

  const statusDistribution = [
    { name: "Pendientes", value: pending },
    { name: "Confirmadas", value: confirmed },
    { name: "Completadas", value: completed },
    { name: "Canceladas", value: total - pending - confirmed - completed },
  ];

  return NextResponse.json({
    totalAppointments: total,
    pendingAppointments: pending,
    confirmedAppointments: confirmed,
    completedAppointments: completed,
    totalPatients,
    todayAppointments: todayCount,
    monthlyData,
    statusDistribution,
  });
}
