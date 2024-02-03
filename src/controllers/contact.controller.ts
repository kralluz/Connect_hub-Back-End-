import { Request, Response } from "express";
import { ContactResponse } from "../interfaces/Contacts.interface";
import { ContactService } from "../services/contact.service";
import { extractId } from "../services/session.service";

export class contactController {
    static async createContact(
        req: Request,
        res: Response<ContactResponse>
    ): Promise<Response<ContactResponse>> {
        const body = req.body;
        const token = req.headers.authorization;
        const clientId = extractId(token);
        const newContact = await ContactService.createContact(clientId!, body);
        return res.status(200).json(newContact);
    }

    static async readAllContacts(
        req: Request,
        res: Response<ContactResponse>
    ): Promise<any> {
        const {
            query: { contactId },
        } = req;
        const token = req.headers.authorization;
        const clientId = extractId(token);
        const response = await ContactService.readAllContacts(clientId!);
        res.status(200).json(response);
    }

    static async getContactById(
        req: Request,
        res: Response<ContactResponse | any>
    ): Promise<Response<ContactResponse | any>> {
        const contactId = req.params.id;
        const token = req.headers.authorization;
        const clientId = extractId(token);
        const contact = await ContactService.getContactById(
            clientId!,
            contactId
        );
        return res.status(200).json(contact);
    }

    static async updateContact(
        req: Request,
        res: Response<ContactResponse>
    ): Promise<Response<ContactResponse>> {
        const contactId = req.params.id;
        const body = req.body;
        const token = req.headers.authorization;
        const clientId = extractId(token);

        const response = await ContactService.updateContact(
            clientId!,
            contactId as string,
            body
        );
        return res.status(200).json(response);
    }

    static async deleteContact(
        req: Request,
        res: Response<ContactResponse>
    ): Promise<Response<ContactResponse>> {
        const contactId = req.params.id;
        const token = req.headers.authorization;
        const clientId = extractId(token);
        await ContactService.deleteContact(clientId!, contactId as string);
        return res.status(204).json();
    }
}
