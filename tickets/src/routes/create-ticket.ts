import { Router } from "express";
import { currentUserMiddleWare, requireAuthMiddleWare, validationRequest } from "@sagi-ticketing/common";
import { body } from "express-validator";
import { createTicketController } from "../controllers/create-ticket";

const router = Router();

router.post(
  "/",
  body("price").isNumeric().withMessage("Price must be specified"),
  body("title").notEmpty().withMessage("Title is not valid"),
  validationRequest,
  createTicketController
);

export { router as createTicketsRouter };
