import express from "express";
import cors from "cors";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { sessionRoutes } from "./routes/session.route";
import { clientsRoutes } from "./routes/clients.routes";
import { contactsRoutes } from "./routes/contacts.routes";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger_output.json");

export const app = express();

// Configuração do CORS para permitir todas as origens
app.use(cors());
app.use(express.json());

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/session", sessionRoutes);
app.use("/clients", clientsRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleErrors);
