import { Router } from "express";
import { currentUserController } from "../controllers/current-user";
import { currentUserMiddleWare } from "../middlewares/current-user";
import { requireAuthMiddleWare } from "../middlewares/require-auth";

export const router = Router();

router.get("/currentUser", currentUserMiddleWare, requireAuthMiddleWare, currentUserController);

export { router as currentUserRouter };
