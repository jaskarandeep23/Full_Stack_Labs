
import type { Role } from "../interfaces/Role";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/employees`;

export const roleRepo = {
  // Get all organization records from the backend
  async getRoles(): Promise<Role[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load roles.");
    }

    return response.json();
  },

  // Find a role by its title
  async getRole(
    roleName: string
  ): Promise<Role | undefined> {
    const roles = await this.getRoles();

    return roles.find(
      (person) =>
        person.role.trim().toLowerCase() ===
        roleName.trim().toLowerCase()
    );
  },

  // Create a new organization record in the backend
  async createRole(newRole: Role): Promise<void> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRole),
    });

    if (!response.ok) {
      const result = await response.json().catch(() => null);

      throw new Error(
        result?.firstNameError ||
          result?.roleError ||
          "Failed to create role."
      );
    }
  },
};
