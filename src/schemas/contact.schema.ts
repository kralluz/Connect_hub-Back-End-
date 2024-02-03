import { z } from "zod";


export const contactSchema = z.object({
    id: z.number().int().positive(),
    client_id: z.number().int().positive(),
    name: z.string().max(45),
    email: z.string().max(45).email().nullable(),
    phone: z.string().refine(data => /^\d{8,15}$/.test(data), {
        message: 'Phone must be a string containing 8 to 15 digits.'
    }),
    created_at: z.union([z.string(), z.date()]), 
    updated_at: z.union([z.string(), z.date()]).nullable(), 
});


export const contactCreateSchema = contactSchema.pick({
    name: true,
    email: true,
    phone: true,
});


export const contactResponseSchema = contactSchema.pick({
    id: true,
    client_id: true,
    name: true,
    email: true,
    phone: true,
    created_at: true,
    updated_at: true,
});


export const contactReadAllSchema = contactResponseSchema.array();


export const contactUpdateSchema = z.object({
    name: z.string().max(45).optional(),
    password: z.string().max(300).optional(),
    phone: z.string().max(45).optional(),
});
