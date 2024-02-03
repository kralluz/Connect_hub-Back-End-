import { PrismaClient } from "../../prisma/src/generated/client";
import { ContactCreate } from "../interfaces/Contacts.interface";
const prisma = new PrismaClient();
import "dotenv/config";

export class ContactService {
    static async createContact(
        clientId: number,
        contact: ContactCreate
    ): Promise<any> {
        const newContact = await prisma.contact.create({
            data: {
                client: {
                    connect: { id: clientId },
                },
                name: contact.name,
                email: contact.email,
                phone: contact.phone,
            },
        });

        await prisma.$disconnect();
        return newContact;
    }

    static async readAllContacts(clientId: number): Promise<any> {
        let contacts;
        contacts = await prisma.contact.findMany({
            where: {
                client_id: clientId,
            },
        });

        await prisma.$disconnect();
        return contacts;
    }

    static async getContactById(clientId: number, id: string) {
        let contact;
        contact = await prisma.contact.findUnique({
            where: {
                client_id: clientId,
                id: Number(id),
            },
        });
        await prisma.$disconnect();
        return contact;
    }

    static async updateContact(clientId: number, contactId: string, body: any) {
        let contact;
        contact = await prisma.contact.update({
            where: {
                client_id: clientId,
                id: Number(contactId),
            },
            data: {
                name: body.name,
                email: body.email,
                phone: body.phone,
            },
        });
        await prisma.$disconnect();
        return contact;
    }

    static async deleteContact(
        clientId: number,
        contactId: string
    ): Promise<void> {
        await prisma.contact.delete({
            where: {
                client_id: clientId,
                id: Number(contactId),
            },
        });
        await prisma.$disconnect();
    }
}
