import { Router } from "express";
import { SessionController } from "../controllers/session.controller";
import * as middlewares from "../middlewares/globals.middleware";
import { clientSessionSchema } from "../schemas/client.schema";

export const sessionRoutes = Router();

sessionRoutes.post("/", middlewares.bodyValidation(clientSessionSchema), middlewares.emailValidate, SessionController);
