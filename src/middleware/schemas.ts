import { z } from "zod";

export const itemSchema = z.object({
  shortDescription: z.string().regex(/^[\w\s\-]+$/),
  price: z.string().regex(/^\d+\.\d{2}$/),
});

export const receiptSchema = z.object({
  retailer: z.string().regex(/^[a-zA-Z0-9\s\-&]+$/),
  purchaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  purchaseTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
  items: z.array(itemSchema).min(1),
  total: z.string().regex(/^\d+\.\d{2}$/),
});

export const idSchema = z.string().regex(/^\S+$/);

export type Receipt = z.infer<typeof receiptSchema>;
export type Item = z.infer<typeof itemSchema>;
