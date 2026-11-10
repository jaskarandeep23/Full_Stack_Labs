import type { Role } from "../interfaces/Role";
import { prisma } from "../lib/prisma";

export const roleRepository = {
  // Get all roles
  async getRoles(): Promise<Role[]> {
    const roles = await prisma.role.findMany({
      orderBy: { id: "asc" },
    });

    return roles.map(({ firstName, lastName, role }) => ({
      firstName,
      lastName,
      role,
    }));
  },

  // Find a role by its title
  async getRole(roleName: string) {
    return prisma.role.findFirst({
      where: {
        role: {
          equals: roleName.trim(),
          mode: "insensitive",
        },
      },
    });
  },

  // Create a new role
  async createRole(newRole: Role) {
    return prisma.role.create({
      data: newRole,
    });
  },

  // Update an existing role
  async updateRole(roleName: string, updatedRole: Role) {
    const existing = await this.getRole(roleName);

    if (!existing) {
      return undefined;
    }

    return prisma.role.update({
      where: { id: existing.id },
      data: updatedRole,
    });
  },

  // Delete a role
  async deleteRole(roleName: string): Promise<boolean> {
    const existing = await this.getRole(roleName);

    if (!existing) {
      return false;
    }

    await prisma.role.delete({
      where: { id: existing.id },
    });

    return true;
  },
};
