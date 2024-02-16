import { contactController } from "../controllers/contact.controller";
import * as middlewares from "../middlewares/globals.middleware";
import { contactCreateSchema } from "../schemas/contact.schema";
import { Router } from "express";

export const contactsRoutes = Router();

contactsRoutes.post(
    "/",
    middlewares.verifyToken,
    middlewares.bodyValidation(contactCreateSchema),
/*     middlewares.numberContactValidate, */
    contactController.createContact
);

contactsRoutes.get(
    "/",
    middlewares.verifyToken,
    contactController.readAllContacts
);

contactsRoutes.get(
    "/:id",
    middlewares.verifyToken,
    middlewares.verifyContactId,
    contactController.getContactById
);

contactsRoutes.patch(
    "/:id",
    middlewares.verifyToken,
    middlewares.verifyContactId,
    contactController.updateContact
);

contactsRoutes.delete(
    "/:id",
    middlewares.verifyToken,
    middlewares.verifyContactId,
    contactController.deleteContact
);
