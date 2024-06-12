import { Router } from "express";
import { currentUserController } from "@sagi-ticketing/common";
import { currentUserMiddleWare } from "@sagi-ticketing/common";
import { requireAuthMiddleWare } from "@sagi-ticketing/common";

export const router = Router();

router.get("/currentUser", currentUserMiddleWare, requireAuthMiddleWare, currentUserController);

export { router as currentUserRouter };
