// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require("@prisma/client");
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123", 12);

  await prisma.user.upsert({
    where: { email: "admin@menteclara.es" },
    update: {},
    create: {
      name: "Dra. Azucena Ramos",
      email: "admin@menteclara.es",
      password: hashedPassword,
      role: "PSYCHOLOGIST",
    },
  });

  // Default weekly schedule: Mon-Fri, 9-14 and 16-19
  await prisma.weeklySchedule.deleteMany();
  const weekdays = [1, 2, 3, 4, 5]; // Mon-Fri

  for (const day of weekdays) {
    await prisma.weeklySchedule.createMany({
      data: [
        { dayOfWeek: day, startTime: "09:00", endTime: "14:00", isActive: true },
        { dayOfWeek: day, startTime: "16:00", endTime: "19:00", isActive: true },
      ],
    });
  }

  console.log("✅ Seed completado:");
  console.log("   Email: admin@menteclara.es");
  console.log("   Password: admin123");
  console.log("   Horario: L-V 9:00-14:00 y 16:00-19:00");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
