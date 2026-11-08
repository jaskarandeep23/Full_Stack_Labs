import type { Employee } from "../interfaces/Employee";
import { employeeRepo } from "../repositories/employeeRepo";

export const employeeService = {
  async getDepartments() {
    return employeeRepo.getDepartments();
  },

  validateDepartment(departmentName: string): string {
    if (!departmentName || departmentName.trim() === "") {
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

  async createEmployee(departmentName: string, employee: Employee) {
    const departmentError = this.validateDepartment(departmentName);
    const firstNameError = this.validateFirstName(employee.firstName);

    if (departmentError || firstNameError) {
      return {
        success: false,
        departmentError,
        firstNameError,
      };
    }

    try {
      await employeeRepo.createEmployee(departmentName, employee);

      return {
        success: true,
        departmentError: "",
        firstNameError: "",
      };
    } catch (error) {
      return {
        success: false,
        departmentError:
          error instanceof Error ? error.message : "Unable to add employee.",
        firstNameError: "",
      };
    }
  },
};
