import "dotenv/config";
import AppError from "../middlewares/errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { SessionReturn, ClientSession } from "../interfaces/Clients.interface";
import { PrismaClient } from "../../prisma/src/generated/client";
const prisma = new PrismaClient();
import jwt from "jsonwebtoken";

export const extractId = (
    authorizationHeader: string | undefined
): number | null => {
    if (!authorizationHeader) {
        return null;
    }

    const parts = authorizationHeader.split(" ");

    if (parts.length === 2 && parts[0].toLowerCase() === "bearer") {
        const token = parts[1];
        const secret_key = process.env.JWT_SECRET_KEY || "";
        try {
            const decodedToken: any = jwt.verify(token, secret_key);
            return parseInt(decodedToken.clientId);
        } catch (error) {
            return null;
        }
    }

    return null;
};

const sessionService = async (
    body: ClientSession
): Promise<SessionReturn | any> => {
    const { email } = body;
    const user = await prisma.client.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) return null;

    const comparePass = await compare(body.password, user.password);

    if (!comparePass) return null;

    const token = sign({ clientId: user.id }, process.env.JWT_SECRET_KEY!, {
        subject: user.id.toString(),
        expiresIn: process.env.EXPIRES_IN!,
    });

    return { token };
};

export default sessionService;
