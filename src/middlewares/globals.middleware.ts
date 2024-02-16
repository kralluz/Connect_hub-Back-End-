import "dotenv/config";
import AppError from "../middlewares/errors";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { ZodTypeAny } from "zod";
import { PrismaClient } from "../../prisma/src/generated/client";
import { extractId } from "../services/session.service";
import { verify } from "jsonwebtoken";
import { ContactService } from "../services/contact.service";

const prisma = new PrismaClient();

export const bodyValidation =
    (schema: ZodTypeAny) =>
    (req: Request, res: Response, next: NextFunction): void => {
        if (req.body.value) req.body.value = Number(req.body.value);
        req.body = schema.parse(req.body);
        return next();
    };

export const verifyToken = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({ error: "Missing bearer token" });
    }

    if (!authorization.startsWith("Bearer")) {
        return res.status(401).json({ error: "Invalid token" });
    }

    const token: string = authorization.split(" ")[1];
    const decoded = verify(token, process.env.JWT_SECRET_KEY!) as JwtPayload;

/*     const contact = await ContactService.getContactById(decoded.clientId, req.params.id);
    if (!contact || decoded.clientId !== contact?.client_id) {
        return res.status(403).json({ error: "Unauthorized" });
    } */

    res.locals = { ...res.locals, decoded };
    return next();
};

export const verifyContactId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    const clientId = extractId(token);

    const result = await prisma.contact.findUnique({
        where: {
            client_id: Number(clientId),
            id: Number(id),
        },
    });

    if (result == null) {
        return res.status(404).json({ error: `Id Not Found.` });
    }

    next();
};

export const verifyClientId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const id = req.params.id;
    const result = await prisma.client.findUnique({
        where: {
            id: Number(id),
        },
    });
    if (result == null) {
        return res.status(404).json({ error: `Id not found.` });
    }

    next();
};

export const numberContactValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { phone } = req.body;

    const existingPhone = await prisma.contact.findFirst({
        where: {
            phone: phone,
        },
    });

    if (existingPhone) {
        return res.status(409).json({ error: "Phone already exists." });
    }

    return next();
};

export const numberClientValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { phone } = req.body;

    if (!phone) {
        return next();
    }

    const existingPhone = await prisma.client.findFirst({
        where: {
            phone: phone,
        },
    });

    if (existingPhone) {
        return res.status(409).json({ error: "Phone already exists." });
    }

    return next();
};

export const verifyExistEmail = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;

    if (!email) {
        return next();
    }

    const existingEmail = await prisma.client.findUnique({
        where: {
            email: email,
        },
    });

    if (!existingEmail) {
        return res.status(404).json({ error: "Email not exists." });
    }

    return next();
};

export const emailValidate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email } = req.body;

    if (!email) {
        return next();
    }

    const existingEmail = await prisma.client.findUnique({
        where: {
            email: email,
        },
    });

    if (existingEmail) {
        return res.status(409).json({ error: "Email already exists." });
    }

    return next();
};

export const validateUpdate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, username, password } = req.body;

    if (!email && !username && !password) {
        throw new AppError("At least one field must be filled", 400);
    }

    return next();
};
