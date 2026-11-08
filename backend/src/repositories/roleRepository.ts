
import type { Role } from "../interfaces/Role";
import rolesData from "../data/roles.json";

let roles: Role[] = [...rolesData];

export const roleRepository = {
  getRoles(): Role[] {
    return [...roles];
  },

  getRole(roleName: string): Role | undefined {
    return roles.find(
      (person) =>
        person.role.trim().toLowerCase() ===
        roleName.trim().toLowerCase()
    );
  },

  createRole(newRole: Role): Role {
    roles = [...roles, newRole];
    return newRole;
  },

  updateRole(
    roleName: string,
    updatedRole: Role
  ): Role | undefined {
    const existingRole = this.getRole(roleName);

    if (!existingRole) {
      return undefined;
    }

    roles = roles.map((person) =>
      person.role.trim().toLowerCase() ===
      roleName.trim().toLowerCase()
        ? updatedRole
        : person
    );

    return updatedRole;
  },

  deleteRole(roleName: string): boolean {
    const existingRole = this.getRole(roleName);

    if (!existingRole) {
      return false;
    }

    roles = roles.filter(
      (person) =>
        person.role.trim().toLowerCase() !==
        roleName.trim().toLowerCase()
    );

    return true;
  },
};
