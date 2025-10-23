import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { authorizeRoles } from "../middleware/authorizeRole";
import { createUser, deleteUser, getAllUsers , updateUserRole,updateUserDetails} from "../controllers/users.controller";




const router = express.Router();

router.use(authMiddleware, authorizeRoles("superadmin"));
// superadmin priviledges
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.get("/", getAllUsers)
router.patch("/updateDetails/:id", updateUserDetails)
router.patch("/updateRole/:id", updateUserRole)




export default router