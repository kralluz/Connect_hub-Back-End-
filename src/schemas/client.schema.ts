import { z } from "zod";


export const clientSchema = z.object({
    id: z.number().int().positive(),
    name: z.string().max(45),
    email: z.string().max(45).email(),
    password: z.string().max(300),
    phone: z.string().refine(data => /^\d{8,15}$/.test(data), {
        message: 'Phone must be a string containing 8 to 15 digits.'
    }),
    created_at: z.date(),
    updated_at: z.date().nullable(),
});


export const clientCreateSchema = clientSchema.pick({
    name: true,
    email: true,
    password: true,
    phone: true,
});


export const clientResponseSchema = clientSchema.pick({
    id: true,
    name: true,
    email: true,
    phone: true,
    created_at: true,
    updated_at: true,
});


export const clientReadAllSchema = clientResponseSchema.array();


export const clientUpdateSchema = z.object({
    name: z.string().max(45).optional(),
    password: z.string().max(300).optional(),
    phone: z.string().refine(data => /^\d{8,15}$/.test(data), {
        message: 'Phone must be a string containing 8 to 15 digits.'
    }).optional(),
});


export const clientSessionSchema = clientSchema.pick({
    email: true,
    password: true,
});
