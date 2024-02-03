import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import * as middlewares from "../middlewares/globals.middleware";
import { clientUpdateSchema } from "../schemas/client.schema";
import { clientCreateSchema } from "../schemas/client.schema";

export const clientsRoutes: Router = Router();

clientsRoutes.post(
    "/",
    middlewares.bodyValidation(clientCreateSchema),
    middlewares.emailValidate,
    middlewares.numberClientValidate,
    ClientController.createClient
);

clientsRoutes.get("/", ClientController.readAllClients);

clientsRoutes.get(
    "/:id",
    middlewares.verifyClientId,
    ClientController.getClientById
);

clientsRoutes.patch(
    "/:id",
    middlewares.verifyClientId,
    middlewares.bodyValidation(clientUpdateSchema),
    middlewares.numberClientValidate,
    ClientController.updateClient
);

clientsRoutes.delete(
    "/:id",
    middlewares.verifyClientId,
    ClientController.deleteClient
);
