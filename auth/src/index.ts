import express, { Request, Response } from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signIn";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";

const app = express();
app.use(json());

app.use("/api/auth/", currentUserRouter);

app.use("/api/auth/", signInRouter);

app.use("/api/auth/", signOutRouter);

app.use("/api/auth/", signUpRouter);

app.listen(3000, () => console.log(`Auth service up on port 3000`));
