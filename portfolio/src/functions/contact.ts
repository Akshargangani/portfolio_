import { createServerFn } from "@tanstack/react-start";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { deliverContactMessage } from "@/lib/contact-server";

export type ContactPayload = ContactFormValues;

function mapContactError(error: unknown): string {
  const message = error instanceof Error ? error.message : "";

  if (message === "CONTACT_NOT_CONFIGURED") {
    return "Add VITE_WEB3FORMS_ACCESS_KEY to .env.local (replace YOUR_ACCESS_KEY with your real key from web3forms.com), then restart npm run dev.";
  }
  if (message === "RESEND_NOT_CONFIGURED") {
    return "Resend API key is missing. Add RESEND_API_KEY to .env or use Web3Forms instead.";
  }
  if (message === "WEB3FORMS_NOT_ACTIVATED") {
    return "Web3Forms is not activated. Check your inbox for the verification email from Web3Forms.";
  }
  if (message.includes("Activate Form") || message.includes("activation")) {
    return "Email service needs activation. Use Web3Forms — see CONTACT_SETUP.md.";
  }

  return message || "Failed to send message. Please try again or email directly.";
}

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((payload: ContactFormValues) => contactFormSchema.parse(payload))
  .handler(async ({ data }) => {
    try {
      await deliverContactMessage(data);
      return { success: true as const };
    } catch (error) {
      throw new Error(mapContactError(error));
    }
  });
