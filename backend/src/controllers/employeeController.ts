
import type { Request, Response } from "express";
import { employeeService } from "../services/employeeService";

export const employeeController = {
  // Get all departments and employees
  getDepartments(_req: Request, res: Response) {
    const departments = employeeService.getDepartments();

    res.status(200).json(departments);
  },

  // Create a new employee
  createEmployee(req: Request, res: Response) {
    const { departmentName, employee } = req.body ?? {};

    const result = employeeService.createEmployee(
      departmentName,
      employee
    );

    if (!result.success) {
      res.status(400).json(result);
      return;
    }

    res.status(201).json(result);
  },
};
