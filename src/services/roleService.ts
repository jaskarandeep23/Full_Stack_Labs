
import type { Role } from "../interfaces/Role";
import { roleRepo } from "../repositories/roleRepo";

export const roleService = {
  // Get roles from the backend
  async getRoles(): Promise<Role[]> {
    return roleRepo.getRoles();
  },

  // Validate employee first name
  validateFirstName(firstName: string): string {
    if (firstName.trim().length < 3) {
      return "First name must be at least 3 characters.";
    }

    return "";
  },

  // Validate role name
  validateRole(roleName: string): string {
    if (roleName.trim() === "") {
      return "Please enter a role.";
    }

    return "";
  },

  // Create a new role through the backend
  async createRole(newRole: Role) {
    const firstNameError = this.validateFirstName(newRole.firstName);
    const roleError = this.validateRole(newRole.role);

    if (firstNameError || roleError) {
      return {
        success: false,
        firstNameError,
        roleError,
      };
    }

    try {
      await roleRepo.createRole({
        firstName: newRole.firstName.trim(),
        lastName: newRole.lastName.trim(),
        role: newRole.role.trim(),
      });

      return {
        success: true,
        firstNameError: "",
        roleError: "",
      };
    } catch (error) {
      return {
        success: false,
        firstNameError: "",
        roleError:
          error instanceof Error
            ? error.message
            : "Unable to create role.",
      };
    }
  },
};
