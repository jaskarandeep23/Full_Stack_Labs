import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

export const employeeController = {
  // Get all departments and employees
  async getDepartments(_req: Request, res: Response) {
    try {
      const departments = await employeeService.getDepartments();

      res.status(200).json(departments);
    } catch (error) {
      console.error("Error fetching departments:", error);
      res.status(500).json({
        message: "Failed to fetch departments.",
      });
    }
  },

  // Create a new employee
  async createEmployee(req: Request, res: Response) {
    try {
      const { departmentName, employee } = req.body ?? {};

      const result = await employeeService.createEmployee(
        departmentName,
        employee
      );

      if (!result.success) {
        res.status(400).json(result);
        return;
      }

      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating employee:", error);
      res.status(500).json({
        message: "Failed to create employee.",
      });
    }
  },
};
