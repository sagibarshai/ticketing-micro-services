import { Router } from "express";
import { signOutController } from "../controllers/signout";

const router = Router();

router.post("/signOut", signOutController);

export { router as signOutRouter };
