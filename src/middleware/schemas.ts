import { z } from "zod";

export const itemSchema = z.object({
  // Matches alphanumeric characters, spaces, and hyphens
  shortDescription: z.string().regex(/^[\w\s\-]+$/),

  // Matches price in the format of 1.00, 2.50, etc.
  price: z.string().regex(/^\d+\.\d{2}$/),
});

export const receiptSchema = z.object({
  // Matches alphanumeric characters, spaces, hyphens, and ampersand
  retailer: z.string().regex(/^[a-zA-Z0-9\s\-&]+$/),

  // Matches a date in YYYY-MM-DD format
  purchaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  // Matches a time in HH:mm format
  purchaseTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/),

  // Ensures that there is at least one item in the receipt
  items: z.array(itemSchema).min(1),

  // Matches total price in the format of 1.00, 2.50, etc. (two digits after the decimal point)
  total: z.string().regex(/^\d+\.\d{2}$/),
});

export const idSchema = z.string().regex(/^\S+$/); // Ensures the ID is non-whitespace characters

export type Receipt = z.infer<typeof receiptSchema>;
export type Item = z.infer<typeof itemSchema>;
