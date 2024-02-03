import { PrismaClient } from "../../prisma/src/generated/client";
import {
    ClientResponse,
    ClientCreate,
    ClientReadResponse,
    ClientUpdate,
} from "../interfaces/Clients.interface";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export class ClientService {
    static async createClient(body: ClientCreate): Promise<ClientResponse> {
        const hashedPassword = body.password
            ? await bcrypt.hash(body.password, 10)
            : undefined;

        const createdClient = await prisma.client.create({
            data: {
                name: body.name!,
                email: body.email!,
                password: hashedPassword!,
                phone: body.phone!,
            },
        });

        const client = await prisma.client.findUnique({
            where: { id: createdClient.id },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                created_at: true,
                updated_at: true,
            },
        });

        await prisma.$disconnect();
        return client!;
    }

    static async readAllClients(): Promise<any> {
        const clients = await prisma.client.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                created_at: true,
                updated_at: true,
            },
        });

        await prisma.$disconnect();
        return clients;
    }

    static async getClientById(id: any): Promise<ClientResponse | null> {
        const client = await prisma.client.findUnique({
            where: {
                id: parseInt(id),
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                created_at: true,
                updated_at: true,
            },
        });

        await prisma.$disconnect();
        return client;
    }

    static async updateClient(id: any, body: ClientUpdate): Promise<ClientResponse> {
        let updateData: any = {
            ...body,
        };
    
        if (body.password) {
            const hashedPassword = await bcrypt.hash(body.password, 10);
            updateData.password = hashedPassword;
        } else {
            delete updateData.password;
        }
    
        const updatedClient = await prisma.client.update({
            where: {
                id: parseInt(id),
            },
            data: updateData,
        });
    
        const { password, ...updatedClientWithoutPassword } = updatedClient;
    
        await prisma.$disconnect();
        return updatedClientWithoutPassword;
    }

    static async deleteClient(id: any): Promise<void> {
        await prisma.client.delete({
            where: {
                id: parseInt(id),
            },
        });

        await prisma.$disconnect();
    }
}
