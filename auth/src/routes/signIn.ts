import { Router } from "express";
import { body } from "express-validator";
import { signInController } from "../controllers/signin";
import { validationRequest } from "../middlewares/validation-request";

const router = Router();

router.post(
  "/signIn",
  body("email").isEmail().withMessage("Email is not valid"),
  body("password").notEmpty({ ignore_whitespace: true }).withMessage("Password must supplied"),
  validationRequest,
  signInController
);

export { router as signInRouter };
