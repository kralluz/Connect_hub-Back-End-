import { Request, Response } from "express";
import { ClientResponse, ClientCreate } from "../interfaces/Clients.interface";
import { ClientService } from "../services/client.service";

export class ClientController {
    static async createClient(
        req: Request,
        res: Response<ClientResponse>
    ): Promise<Response<ClientResponse>> {
        const body: ClientCreate = req.body;
        const response = await ClientService.createClient(body);
        return res.status(201).json(response);
    }

    static async readAllClients(
        req: Request,
        res: Response<ClientResponse>
    ): Promise<Response> {
        const response = await ClientService.readAllClients();
        return res.status(200).json(response);
    }

    static async getClientById(
        req: Request,
        res: Response<ClientResponse>
    ): Promise<Response> {
        const id = req.params.id;
        const response: any = await ClientService.getClientById(id);
        return res.status(200).json(response);
    }

    static async updateClient(
        req: Request,
        res: Response<ClientResponse>
    ): Promise<Response> {
        const id = req.params.id;
        const body = req.body;

        const response: ClientResponse = await ClientService.updateClient(
            id,
            body
        );
        return res.status(200).json(response);
    }

    static async deleteClient(
        req: Request,
        res: Response<ClientResponse>
    ): Promise<Response> {
        const deleteId = req.params.id;
        await ClientService.deleteClient(deleteId);
        return res.status(204).json();
    }
}
