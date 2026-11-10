import type { Request, Response } from "express";
import { roleService } from "../services/roleService";

export const roleController = {
  // Get all organization roles
  async getRoles(_req: Request, res: Response) {
    try {
      const roles = await roleService.getRoles();

      res.status(200).json(roles);
    } catch (error) {
      console.error("Error fetching roles:", error);
      res.status(500).json({
        message: "Failed to fetch roles.",
      });
    }
  },

  // Create a new organization role
  async createRole(req: Request, res: Response) {
    try {
      const { firstName, lastName, role } = req.body ?? {};

      const result = await roleService.createRole({
        firstName,
        lastName,
        role,
      });

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating role:", error);
      res.status(500).json({
        message: "Failed to create role.",
      });
    }
  },
};
