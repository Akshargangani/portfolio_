import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  company: z.string().trim().max(100, "Company name is too long").optional(),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(5000, "Message is too long"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export type ContactPayload = ContactFormValues;
