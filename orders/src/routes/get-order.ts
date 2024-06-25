import { Router } from "express";
import { getOrderController } from "../controllers/get-order";
import { param } from "express-validator";
import { validationRequest } from "@sagi-ticketing/common";

const router = Router();

router.get("/", getOrderController);

router.get("/:id", param("id").isNumeric().withMessage("Order id is not valid"), validationRequest, getOrderController);

export { router as getOrderRouter };
