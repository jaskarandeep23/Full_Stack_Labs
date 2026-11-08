
import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();
const PORT = 3000;

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Allow JSON requests
app.use(express.json());

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ message: "Backend is running!" });
});

// Employee routes
app.use("/api/employees", employeeRoutes);

// Role routes
app.use("/api/roles", roleRoutes);

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
