import { Router } from "express";
import { employeeController } from "../controllers/employeeController";

const router = Router();

// Get all departments and employees
router.get("/", employeeController.getDepartments);

// Add a new employee
router.post("/", employeeController.createEmployee);

export default router;
