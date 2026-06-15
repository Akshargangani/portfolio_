import type { ContactPayload } from "@/lib/contact-schema";

export const WEB3FORMS_SUBMIT_URL = "https://api.web3forms.com/submit";

const PLACEHOLDER_MARKERS = [
  "your_web3forms_access_key",
  "YOUR_ACCESS_KEY",
  "your_access_key",
];

export function isWeb3FormsKeyConfigured(key: string | undefined): boolean {
  if (!key?.trim()) return false;
  const lower = key.toLowerCase();
  return !PLACEHOLDER_MARKERS.some((marker) => lower.includes(marker.toLowerCase()));
}

/** @deprecated Use getWeb3FormsAccessKeyFromEnv from contact-env.ts */
export function getWeb3FormsAccessKey(): string | undefined {
  const fromVite = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined;
  if (isWeb3FormsKeyConfigured(fromVite)) return fromVite!.trim();
  return undefined;
}

function buildMessageBody(data: ContactPayload): string {
  return [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company ? `Company: ${data.company}` : null,
    "",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function submitToWeb3Forms(
  data: ContactPayload,
  accessKey: string
): Promise<void> {
  const response = await fetch(WEB3FORMS_SUBMIT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: `Portfolio contact from ${data.name}`,
      from_name: data.name,
      email: data.email,
      replyto: data.email,
      message: buildMessageBody(data),
    }),
  });

  if (!response.ok) {
    throw new Error(`Web3Forms request failed (${response.status})`);
  }

  const result = (await response.json()) as { success?: boolean; message?: string };

  if (!result.success) {
    throw new Error(result.message ?? "Web3Forms rejected the submission");
  }
}
