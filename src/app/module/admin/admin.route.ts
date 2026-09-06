import { Router } from "express";
import { auth } from "../../middleware/checkAuth";
import { Role } from "../../../../generated/prisma/enums";
import { AdminController } from "./Admin.controller";

const router = Router();

router.get("/users", auth(Role.ADMIN), AdminController.getUsers);
router.patch("/users/:id/role", auth(Role.ADMIN), AdminController.updateUserRole);
router.patch("/users/:id/status", auth(Role.ADMIN), AdminController.updateUserStatus);
router.delete("/users/:id", auth(Role.ADMIN), AdminController.deleteUser);
router.get("/dashboard-stats", auth(Role.ADMIN), AdminController.getDashboardStats);

export const AdminRouters = router;