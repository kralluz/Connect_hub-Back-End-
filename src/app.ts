import express from "express";
import cors from "cors";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { sessionRoutes } from "./routes/session.route";
import { clientsRoutes } from "./routes/clients.routes";
import { contactsRoutes } from "./routes/contacts.routes";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/session", sessionRoutes);
app.use("/clients", clientsRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleErrors);
