import { Router } from "express";
import { body } from "express-validator";
import { createOrderController } from "../controllers/create-order";

const router = Router();

router.post("/", body("ticketId").isNumeric().withMessage("ticketId is not valid"), createOrderController);

export { router as createOrderRouter };
