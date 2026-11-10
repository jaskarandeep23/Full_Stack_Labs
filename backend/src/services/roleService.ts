import type { Role } from "../interfaces/Role";
import { roleRepository } from "../repositories/roleRepository";

export const roleService = {
  async getRoles(): Promise<Role[]> {
    return roleRepository.getRoles();
  },

  validateFirstName(firstName: unknown): string {
    if (
      typeof firstName !== "string" ||
      firstName.trim().length < 3
    ) {
      return "First name must be at least 3 characters.";
    }

    return "";
  },

  async validateRole(roleName: unknown): Promise<string> {
    if (typeof roleName !== "string" || roleName.trim() === "") {
      return "Please enter a role.";
    }

    const existingRole = await roleRepository.getRole(roleName);

    if (existingRole) {
      return "This role is already occupied.";
    }

    return "";
  },

  async createRole(newRole: Role) {
    const firstNameError = this.validateFirstName(newRole?.firstName);
    const roleError = await this.validateRole(newRole?.role);

    if (firstNameError || roleError) {
      return {
        success: false,
        firstNameError,
        roleError,
      };
    }

    await roleRepository.createRole({
      firstName: newRole.firstName.trim(),
      lastName:
        typeof newRole.lastName === "string"
          ? newRole.lastName.trim()
          : "",
      role: newRole.role.trim(),
    });

    return {
      success: true,
      firstNameError: "",
      roleError: "",
    };
  },
};
