import { z } from "zod";
import {
    contactSchema,
    contactCreateSchema,
    contactResponseSchema,
    contactUpdateSchema,
} from "../schemas/contact.schema";

export type Contact = z.infer<typeof contactSchema>;
export type ContactResponse = z.infer<typeof contactResponseSchema>;
export type ContactCreate = z.infer<typeof contactCreateSchema>;
export type ContactReadResponse = ContactResponse[];
export type ContactUpdate = z.infer<typeof contactUpdateSchema>;

export type SessionReturn = { token: string };
