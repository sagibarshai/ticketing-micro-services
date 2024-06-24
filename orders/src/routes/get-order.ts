import { Router } from "express";
import { getOrderController } from "../controllers/get-order";

const router = Router();

router.get("/", getOrderController);

router.get("/:id", getOrderController);

export { router as getOrderRouter };
