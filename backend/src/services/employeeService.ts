
import type { Employee } from "../interfaces/Employee";
import { employeeRepository } from "../repositories/employeeRepository";

export const employeeService = {
  getDepartments() {
    return employeeRepository.getDepartments();
  },

  validateDepartment(departmentName: string): string {
    const department = employeeRepository.getDepartment(departmentName);

    if (!department) {
      return "Please select a valid department.";
    }

    return "";
  },

  validateFirstName(firstName: string): string {
    if (typeof firstName !== "string" || firstName.trim().length < 3) {
      return "First name must be at least 3 characters.";
    }

    return "";
  },

  createEmployee(departmentName: string, employee: Employee) {
    const departmentError = this.validateDepartment(departmentName);
    const firstNameError = this.validateFirstName(employee?.firstName);

    if (departmentError || firstNameError) {
      return {
        success: false,
        departmentError,
        firstNameError,
      };
    }

    employeeRepository.createEmployee(departmentName, {
      firstName: employee.firstName.trim(),
      lastName:
        typeof employee.lastName === "string"
          ? employee.lastName.trim()
          : "",
    });

    return {
      success: true,
      departmentError: "",
      firstNameError: "",
    };
  },
};
