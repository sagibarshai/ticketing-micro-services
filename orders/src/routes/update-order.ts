import { Router } from "express";
import { body } from "express-validator";
import { updateOrderController } from "../controllers/update-order";

const router = Router();

router.put("/", updateOrderController);

export { router as updateOrderRouter };
