
import type { Role } from "../interfaces/Role";
import { roleRepo } from "../repositories/roleRepo";

export const roleService = {
  getRoles(): Role[] {
    return roleRepo.getRoles();
  },

  validateFirstName(firstName: string): string {
    if (firstName.trim().length < 3) {
      return "First name must be at least 3 characters.";
    }

    return "";
  },

  validateRole(roleName: string): string {
    if (roleName.trim() === "") {
      return "Please enter a role.";
    }

    const existingRole = roleRepo.getRole(roleName);

    if (existingRole) {
      return "This role is already occupied.";
    }

    return "";
  },

  createRole(newRole: Role) {
    const firstNameError = this.validateFirstName(newRole.firstName);
    const roleError = this.validateRole(newRole.role);

    if (firstNameError || roleError) {
      return {
        success: false,
        firstNameError,
        roleError,
      };
    }

    roleRepo.createRole({
      firstName: newRole.firstName.trim(),
      lastName: newRole.lastName.trim(),
      role: newRole.role.trim(),
    });

    return {
      success: true,
      firstNameError: "",
      roleError: "",
    };
  },
};
