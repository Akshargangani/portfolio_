import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";

export const CONTACT_INBOX =
  import.meta.env.VITE_CONTACT_EMAIL?.trim() || "hello@akshar.dev";

export type { ContactFormValues };

const CONTACT_API = "/api/contact";

/** Sends contact form via server API → Web3Forms (https://api.web3forms.com/submit). */
export async function submitContactMessage(
  raw: ContactFormValues
): Promise<{ success: true }> {
  const data = contactFormSchema.parse(raw);

  const response = await fetch(CONTACT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = (await response.json().catch(() => ({}))) as {
    success?: boolean;
    error?: string;
  };

  if (!response.ok || !result.success) {
    throw new Error(result.error ?? "Failed to send message. Please try again.");
  }

  return { success: true };
}

export function formatContactValidationError(error: unknown): string {
  if (error && typeof error === "object" && "issues" in error) {
    const issues = (error as { issues: { message: string }[] }).issues;
    return issues[0]?.message ?? "Please check the form fields.";
  }
  if (error instanceof Error) {
    return error.message;
  }
  return "Failed to send message. Please try again.";
}
