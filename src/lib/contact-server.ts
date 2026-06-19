import type { ContactPayload } from "@/lib/contact-schema";
import { getWeb3FormsAccessKeyFromEnv } from "@/lib/contact-env";
import { submitToWeb3Forms } from "@/lib/web3forms";

export type { ContactPayload };

function isConfigured(value: string | undefined, placeholder: string): boolean {
  return Boolean(value?.trim() && !value.includes(placeholder));
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailHtml(data: ContactPayload): string {
  return `
    <h2>New portfolio contact message</h2>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.company ? `<p><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  `;
}

async function sendViaResend(data: ContactPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_EMAIL ?? "hello@akshar.dev";
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL ?? "Portfolio Contact <onboarding@resend.dev>";

  if (!isConfigured(apiKey, "your_resend_api_key")) {
    throw new Error("RESEND_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: data.email,
      subject: `Portfolio: ${data.name} sent a message`,
      html: buildEmailHtml(data),
    }),
  });

  const result = (await response.json().catch(() => ({}))) as { message?: string };
  if (!response.ok) {
    throw new Error(result.message ?? "Failed to send email via Resend");
  }
}

/** Sends contact email using Web3Forms (default) or Resend. */
export async function deliverContactMessage(data: ContactPayload): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY;

  if (isConfigured(resendKey, "your_resend_api_key")) {
    await sendViaResend(data);
    return;
  }

  const web3Key = getWeb3FormsAccessKeyFromEnv();
  if (web3Key) {
    await submitToWeb3Forms(data, web3Key);
    return;
  }

  throw new Error("CONTACT_NOT_CONFIGURED");
}
