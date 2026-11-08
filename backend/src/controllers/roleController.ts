
import type { Request, Response } from "express";
import { roleService } from "../services/roleService";

export const roleController = {
  // Get all organization roles
  getRoles(_req: Request, res: Response) {
    const roles = roleService.getRoles();

    res.status(200).json(roles);
  },

  // Create a new organization role
  createRole(req: Request, res: Response) {
    const { firstName, lastName, role } = req.body ?? {};

    const result = roleService.createRole({
      firstName,
      lastName,
      role,
    });

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  },
};
