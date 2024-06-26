import { Router } from "express";
import { body } from "express-validator";
import { signUpController } from "../controllers/signup";
import { validationRequest } from "@sagi-ticketing/common";

const router = Router();

router.post(
  "/signUp",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").isLength({ min: 6, max: 16 }).withMessage("Password must contain 6 - 16 characters"),
  validationRequest,
  signUpController
);

export { router as signUpRouter };
