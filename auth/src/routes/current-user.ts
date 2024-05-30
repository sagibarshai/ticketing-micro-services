import { Router } from "express";

export const router = Router();

router.get("currentUser");

export { router as currentUserRouter };
