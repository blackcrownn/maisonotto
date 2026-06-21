"use client";

import { useState, useTransition } from "react";
import { useToastStore } from "@/store/toastStore";
import { contactFormSchema } from "@/lib/schema";
import { Button } from "@/components/ui/Button";

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const { addToast } = useToastStore();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      const result = contactFormSchema.safeParse(formData);
      if (!result.success) {
        const formattedErrors: FormErrors = {};
        result.error.issues.forEach((issue) => {
          const path = issue.path[0] as keyof FormErrors;
          formattedErrors[path] = issue.message;
        });
        setErrors(formattedErrors);
        addToast({
          type: "error",
          message: "Form Hatası",
          description: "Lütfen alanları doğru doldurunuz.",
        });
        return;
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      addToast({
        type: "success",
        message: "Mesajınız İletildi",
        description: "En kısa sürede dönüş sağlayacağız.",
      });

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setErrors({});
    });
  };

  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="container-site max-w-xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-label text-[var(--color-muted)] uppercase tracking-widest block mb-4">İletişim</span>
          <h1 className="text-title font-serif font-light text-[var(--color-ink)] mb-4">
            Bize Ulaşın
          </h1>
          <p className="text-caption text-sm font-light leading-relaxed">
            Sorularınız, önerileriniz veya iş birliği talepleriniz için aşağıdaki formu doldurabilirsiniz.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="contact-name" className="block text-xs uppercase tracking-widest text-[var(--color-ink)] mb-2 font-medium">
              İsim *
            </label>
            <input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isPending}
              className="w-full border border-[var(--border-base)] px-4 py-3 text-sm focus:border-[var(--color-ink)] focus:outline-none disabled:opacity-50 rounded-none bg-white text-[var(--color-ink)]"
            />
            {errors.name && <p className="mt-1 text-xs text-red-500 font-light">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="contact-email" className="block text-xs uppercase tracking-widest text-[var(--color-ink)] mb-2 font-medium">
              E-Posta Adresi *
            </label>
            <input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isPending}
              className="w-full border border-[var(--border-base)] px-4 py-3 text-sm focus:border-[var(--color-ink)] focus:outline-none disabled:opacity-50 rounded-none bg-white text-[var(--color-ink)]"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500 font-light">{errors.email}</p>}
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="contact-subject" className="block text-xs uppercase tracking-widest text-[var(--color-ink)] mb-2 font-medium">
              Konu *
            </label>
            <input
              type="text"
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              disabled={isPending}
              className="w-full border border-[var(--border-base)] px-4 py-3 text-sm focus:border-[var(--color-ink)] focus:outline-none disabled:opacity-50 rounded-none bg-white text-[var(--color-ink)]"
            />
            {errors.subject && <p className="mt-1 text-xs text-red-500 font-light">{errors.subject}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="contact-message" className="block text-xs uppercase tracking-widest text-[var(--color-ink)] mb-2 font-medium">
              Mesajınız *
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              disabled={isPending}
              className="w-full border border-[var(--border-base)] px-4 py-3 text-sm focus:border-[var(--color-ink)] focus:outline-none disabled:opacity-50 rounded-none bg-white text-[var(--color-ink)] resize-none"
            />
            {errors.message && <p className="mt-1 text-xs text-red-500 font-light">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            variant="primary"
            size="full"
            disabled={isPending}
            className="h-12"
          >
            {isPending ? "Gönderiliyor..." : "Mesajı Gönder"}
          </Button>
        </form>
      </div>
    </main>
  );
}
