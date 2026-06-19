import { contactFormSchema } from "@/lib/contact-schema";
import { getContactNotConfiguredMessage, getWeb3FormsAccessKeyFromEnv } from "@/lib/contact-env";
import { submitToWeb3Forms } from "@/lib/web3forms";
import { deliverContactMessage } from "@/lib/contact-server";

function jsonResponse(body: object, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}

export async function handleContactStatusRequest(runtimeEnv?: unknown): Promise<Response> {
  const configured = Boolean(getWeb3FormsAccessKeyFromEnv(runtimeEnv));
  return jsonResponse({ configured });
}

export async function handleContactApiRequest(
  request: Request,
  runtimeEnv?: unknown
): Promise<Response> {
  if (request.method === "GET") {
    return handleContactStatusRequest(runtimeEnv);
  }

  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const body = await request.json();
    const data = contactFormSchema.parse(body);

    const web3Key = getWeb3FormsAccessKeyFromEnv(runtimeEnv);

    if (web3Key) {
      await submitToWeb3Forms(data, web3Key);
      return jsonResponse({ success: true });
    }

    // Resend fallback when WEB3FORMS key missing but RESEND is configured
    try {
      await deliverContactMessage(data);
      return jsonResponse({ success: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : "";
      if (message === "CONTACT_NOT_CONFIGURED" || message === "RESEND_NOT_CONFIGURED") {
        return jsonResponse({ error: getContactNotConfiguredMessage() }, 503);
      }
      throw err;
    }
  } catch (err) {
    if (err && typeof err === "object" && "issues" in err) {
      const issues = (err as { issues: { message: string }[] }).issues;
      return jsonResponse({ error: issues[0]?.message ?? "Invalid form data" }, 400);
    }

    const message = err instanceof Error ? err.message : "Failed to send message";
    return jsonResponse({ error: message }, 500);
  }
}
