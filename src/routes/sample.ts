import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRole";

const routery = express.Router();

// Accessible by all authenticated users
routery.get("/player", authMiddleware, (req, res) => {
  res.json({ message: `Welcome, player ID: ${(req as any).user.id}`, role: (req as any).user.role });
});

// Admin or SuperAdmin only
routery.get("/admin", authMiddleware, authorizeRoles("admin", "superAdmin"), (req, res) => {
  res.json({ message: "Welcome Admin or SuperAdmin!" });
});

// SuperAdmin only
routery.get("/super", authMiddleware, authorizeRoles("SuperAdmin"), (req, res) => {
  res.json({ message: "Welcome SuperAdmin!" });
});

export default routery;
