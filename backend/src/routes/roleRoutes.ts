import { Router } from "express";
import { roleController } from "../controllers/roleController";

const router = Router();

// Get all organization roles
router.get("/", roleController.getRoles);

// Add a new organization role
router.post("/", roleController.createRole);

export default router;
