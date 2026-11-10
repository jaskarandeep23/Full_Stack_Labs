import type { Employee } from "../interfaces/Employee";
import { prisma } from "../lib/prisma";

export const employeeRepository = {
  // Get all departments and their employees
  async getDepartments() {
    const departments = await prisma.department.findMany({
      include: {
        employees: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return departments.map((department) => ({
      name: department.name,
      employees: department.employees.map((employee) => ({
        firstName: employee.firstName,
        lastName: employee.lastName ?? "",
      })),
    }));
  },

  // Find a department by name
  async getDepartment(name: string) {
    return prisma.department.findUnique({
      where: { name },
    });
  },

  // Add an employee to a department
  async createEmployee(
    departmentName: string,
    employee: Employee
  ) {
    const department = await prisma.department.findUnique({
      where: { name: departmentName },
    });

    if (!department) {
      throw new Error("Department not found");
    }

    await prisma.employee.create({
      data: {
        firstName: employee.firstName,
        lastName: employee.lastName ?? "",
        departmentId: department.id,
      },
    });

    return this.getDepartments();
  },
};

