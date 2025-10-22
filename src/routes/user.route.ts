import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRole";
import { createUser, deleteUser, getAllUsers } from "../controllers/users.controller";




const router = express.Router();

router.use(authMiddleware, authorizeRoles("superadmin"));
// superadmin priviledges
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers)


export default router