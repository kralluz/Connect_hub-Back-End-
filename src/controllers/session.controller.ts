import { Request, Response } from "express";
import sessionService from "../services/session.service";

export const SessionController = async (
    req: Request,
    res: Response
): Promise<Response> => {
    const body = req.body;
    const response = await sessionService(body);
    if (response === null) res.status(401).json({ message: "Invalid credentials" })
    return res.status(200).json(response);
};
