import { Router } from "express";

const router = Router();
import { body } from "express-validator";
import { editTicketController } from "../controllers/edit-ticket";
import { validationRequest } from "@sagi-ticketing/common";

router.put(
  "/",
  body("price").isNumeric().withMessage("Price must be specified"),
  body("title").notEmpty().withMessage("Title is not valid"),
  body("id").isNumeric().withMessage("Ticket id is not valid"),
  validationRequest,
  editTicketController
);

export { router as editTicketRouter };
