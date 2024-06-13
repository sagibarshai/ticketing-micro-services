import { Router } from "express";
import { currentUserController, currentUserMiddleWare } from "@sagi-ticketing/common";

export const router = Router();

router.get("/currentUser", currentUserMiddleWare, currentUserController);

export { router as currentUserRouter };
