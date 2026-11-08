
import type { Employee } from "../interfaces/Employee";
import type { Department } from "../interfaces/Department";
import departmentsData from "../data/employees.json";

let departments: Department[] = departmentsData;

export const employeeRepository = {
  // Get all departments and employees
  getDepartments(): Department[] {
    return departments;
  },

  // Find a department by name
  getDepartment(name: string): Department | undefined {
    return departments.find(
      (department) => department.name === name
    );
  },

  // Add an employee to a department
  createEmployee(
    departmentName: string,
    employee: Employee
  ): Department[] {
    departments = departments.map((department) => {
      if (department.name === departmentName) {
        return {
          ...department,
          employees: [...department.employees, employee],
        };
      }

      return department;
    });

    return departments;
  },
};

