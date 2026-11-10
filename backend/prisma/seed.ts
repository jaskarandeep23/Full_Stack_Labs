import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import departments from "../src/data/employees.json";
import roles from "../src/data/roles.json";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is missing");
}

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const department of departments) {
    const savedDepartment = await prisma.department.upsert({
      where: { name: department.name },
      update: {},
      create: { name: department.name },
    });

    for (const employee of department.employees) {
      const existing = await prisma.employee.findFirst({
        where: {
          firstName: employee.firstName,
          lastName: employee.lastName,
          departmentId: savedDepartment.id,
        },
      });

      if (!existing) {
        await prisma.employee.create({
          data: {
            firstName: employee.firstName,
            lastName: employee.lastName,
            departmentId: savedDepartment.id,
          },
        });
      }
    }
  }

  for (const person of roles) {
    await prisma.role.upsert({
      where: { role: person.role },
      update: {
        firstName: person.firstName,
        lastName: person.lastName,
      },
      create: {
        firstName: person.firstName,
        lastName: person.lastName,
        role: person.role,
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
