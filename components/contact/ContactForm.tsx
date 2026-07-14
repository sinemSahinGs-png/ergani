"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/validators/contact";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    mode: "onBlur",
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setServerError(data.message ?? "Gönderim başarısız oldu.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setServerError("Bağlantı hatası. Lütfen tekrar deneyiniz.");
    }
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-success)]/25 bg-emerald-50 px-6 py-14 text-center"
        role="status"
      >
        <CheckCircle2 className="mb-3 h-12 w-12 text-[var(--color-success)]" />
        <h3 className="text-xl font-bold text-[var(--color-navy)]">
          Mesajınız alındı
        </h3>
        <p className="mt-2 max-w-sm text-[15px] text-[var(--color-text-gray)]">
          En kısa sürede sizinle iletişime geçilecektir. Teşekkür ederiz.
        </p>
        <button
          type="button"
          className="mt-6 font-semibold text-[var(--color-medical)] underline-offset-2 hover:underline"
          onClick={() => setStatus("idle")}
        >
          Yeni mesaj gönder
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      noValidate
    >
      <Field
        id="adSoyad"
        label="Ad Soyad"
        error={errors.adSoyad?.message}
        dirty={!!dirtyFields.adSoyad}
      >
        <input
          id="adSoyad"
          autoComplete="name"
          placeholder=" "
          className={fieldClass(errors.adSoyad)}
          {...register("adSoyad")}
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="telefon"
          label="Telefon"
          error={errors.telefon?.message}
          dirty={!!dirtyFields.telefon}
        >
          <input
            id="telefon"
            type="tel"
            autoComplete="tel"
            placeholder=" "
            className={fieldClass(errors.telefon)}
            {...register("telefon")}
          />
        </Field>
        <Field
          id="eposta"
          label="E-posta"
          error={errors.eposta?.message}
          dirty={!!dirtyFields.eposta}
        >
          <input
            id="eposta"
            type="email"
            autoComplete="email"
            placeholder=" "
            className={fieldClass(errors.eposta)}
            {...register("eposta")}
          />
        </Field>
      </div>

      <Field
        id="konu"
        label="Konu"
        error={errors.konu?.message}
        dirty={!!dirtyFields.konu}
      >
        <input
          id="konu"
          placeholder=" "
          className={fieldClass(errors.konu)}
          {...register("konu")}
        />
      </Field>

      <Field
        id="mesaj"
        label="Mesaj"
        error={errors.mesaj?.message}
        dirty={!!dirtyFields.mesaj}
      >
        <textarea
          id="mesaj"
          rows={5}
          placeholder=" "
          className={cn(fieldClass(errors.mesaj), "resize-y min-h-[140px] pt-5")}
          {...register("mesaj")}
        />
      </Field>

      <p className="text-sm text-[var(--color-text-gray)]">
        Lütfen T.C. kimlik numarası, hasta dosyası, teşhis veya reçete gibi
        hassas kişisel sağlık bilgilerini bu forma yazmayınız. Form yalnızca
        genel iletişim içindir.
      </p>

      {serverError && (
        <p className="rounded-[var(--radius-sm)] bg-red-50 px-3 py-2 text-sm text-[var(--color-emergency)]" role="alert">
          {serverError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-medical)] px-6 font-semibold text-white shadow-[var(--shadow-md)] transition hover:bg-[#1e56b8] disabled:opacity-70 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Gönderiliyor…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Mesaj Gönder
          </>
        )}
      </button>
    </form>
  );
}

function fieldClass(error?: { message?: string }) {
  return cn(
    "peer w-full rounded-[var(--radius-md)] border bg-white px-4 pt-5 pb-2 text-[15px] text-[var(--color-navy)] outline-none transition",
    "focus:border-[var(--color-medical)] focus:ring-2 focus:ring-[var(--color-medical)]/20",
    error
      ? "border-[var(--color-emergency)]"
      : "border-[var(--color-border)]",
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  dirty?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {children}
      <label
        htmlFor={id}
        className="pointer-events-none absolute top-2.5 left-4 text-xs font-semibold text-[var(--color-text-gray)] transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-[15px] peer-focus:top-2.5 peer-focus:text-xs peer-focus:text-[var(--color-medical)]"
      >
        {label}
      </label>
      {error && (
        <p className="mt-1.5 text-sm text-[var(--color-emergency)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
