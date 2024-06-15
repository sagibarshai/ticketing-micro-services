import { Router } from "express";
import { getTicketController } from "../controllers/get-ticket";

const router = Router();

router.get("/", getTicketController);

router.get("/:id", getTicketController);

export { router as getTicketRouter };
