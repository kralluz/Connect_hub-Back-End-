import express from "express";
import cors from "cors";
import { handleErrors } from "./middlewares/handleErrors.middleware";
import { sessionRoutes } from "./routes/session.route";
import { clientsRoutes } from "./routes/clients.routes";
import { contactsRoutes } from "./routes/contacts.routes";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Exemplo",
            version: "1.0.0",
            description: "Uma API de exemplo documentada com Swagger",
        },
    },
    apis: ["./routes/*.ts"],
};

export const app = express();
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use(cors());
app.use(express.json());

app.use("/session", sessionRoutes);
app.use("/clients", clientsRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleErrors);
