import type { Employee } from "../interfaces/Employee";
import type { Department } from "../interfaces/Department";

const API_URL = "http://localhost:3000/api/employees";

export const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load departments.");
    }

    return response.json();
  },

  async getDepartment(
    name: string
  ): Promise<Department | undefined> {
    const departments = await this.getDepartments();

    return departments.find(
      (department) => department.name === name
    );
  },

  async createEmployee(
    departmentName: string,
    employee: Employee
  ): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        departmentName,
        employee,
      }),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      throw new Error(
        result?.firstNameError ||
        result?.departmentError ||
        "Failed to create employee."
      );
    }
  },
};
