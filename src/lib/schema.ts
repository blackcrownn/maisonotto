import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır.")
    .max(100, "İsim en fazla 100 karakter olabilir."),
  email: z.string().email("Geçerli bir e-posta adresi girin."),
  subject: z
    .string()
    .min(3, "Konu en az 3 karakter olmalıdır.")
    .max(200, "Konu en fazla 200 karakter olabilir."),
  message: z
    .string()
    .min(10, "Mesaj en az 10 karakter olmalıdır.")
    .max(2000, "Mesaj en fazla 2000 karakter olabilir."),
});

export const newsletterSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin."),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
