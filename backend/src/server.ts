import express from "express";
import cors from "cors";

import employeeRoutes from "./routes/employeeRoutes";
import roleRoutes from "./routes/roleRoutes";

const app = express();

// Allow requests from the React frontend
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
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

// Export Express app for Vercel
export default app;

// Start server only when running locally
if (!process.env.VERCEL) {
  const PORT = Number(process.env.PORT) || 3000;

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}
