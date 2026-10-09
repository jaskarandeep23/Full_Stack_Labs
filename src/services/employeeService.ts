import type { Employee } from "../interfaces/Employee";
import { employeeRepo } from "../repositories/employeeRepo";

export const employeeService = {
    getDepartments() {
    return employeeRepo.getDepartments();
    },
    validateDepartment(departmentName: string): string {
    const department = employeeRepo.getDepartment(departmentName);

    if (!department) {
      return "Please select a valid department.";
    }

    return "";
  },

  validateFirstName(firstName: string): string {
    if (firstName.trim().length < 3) {
      return "First name must be at least 3 characters.";
    }

    return "";
  },

  createEmployee(departmentName: string, employee: Employee) {
    const departmentError = this.validateDepartment(departmentName);
    const firstNameError = this.validateFirstName(employee.firstName);

    if (departmentError || firstNameError) {
      return {
        success: false,
        departmentError,
        firstNameError,
      };
    }

    employeeRepo.createEmployee(departmentName, employee);

    return {
      success: true,
      departmentError: "",
      firstNameError: "",
    };
  },
};
