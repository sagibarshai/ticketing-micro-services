import { Router } from "express";
import { body } from "express-validator";
import { updateOrderController } from "../controllers/update-order";
import { Status } from "../models/order";

const router = Router();

router.put(
  "/",
  body("id").isNumeric().withMessage("id is not valid"),
  body("expiredAt").isDate().withMessage("expiredAt is not valid"),
  body("status")
    .custom((status) => status in Status)
    .withMessage("status is not valid"),
  updateOrderController
);

export { router as updateOrderRouter };
