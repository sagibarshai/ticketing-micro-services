import { Router } from "express";
import { currentUserMiddleWare, requireAuthMiddleWare, validationRequest } from "@sagi-ticketing/common";
import { body } from "express-validator";
import { createTicketController } from "../controllers/create-ticket";

const router = Router();

router.post(
  "/create",
  currentUserMiddleWare,
  requireAuthMiddleWare,
  body("price").isNumeric(),
  body("title").notEmpty(),
  validationRequest,
  createTicketController
);

export { router as createTicketsRouter };
