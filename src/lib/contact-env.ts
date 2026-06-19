import { loadEnv } from "vite";
import { isWeb3FormsKeyConfigured } from "@/lib/web3forms";

type EnvBindings = Record<string, string | undefined>;

/** Loads Web3Forms access key from Cloudflare bindings, .env, .env.local, and Vite env. */
export function getWeb3FormsAccessKeyFromEnv(runtimeEnv?: unknown): string | undefined {
  const bindings = (runtimeEnv ?? {}) as EnvBindings;
  const mode = process.env.NODE_ENV ?? "development";
  const fileEnv = loadEnv(mode, process.cwd(), "");

  const candidates = [
    bindings.WEB3FORMS_ACCESS_KEY,
    bindings.VITE_WEB3FORMS_ACCESS_KEY,
    fileEnv.WEB3FORMS_ACCESS_KEY,
    fileEnv.VITE_WEB3FORMS_ACCESS_KEY,
    process.env.WEB3FORMS_ACCESS_KEY,
    process.env.VITE_WEB3FORMS_ACCESS_KEY,
    import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined,
  ];

  for (const key of candidates) {
    if (isWeb3FormsKeyConfigured(key)) {
      return key!.trim();
    }
  }

  return undefined;
}

export function getContactNotConfiguredMessage(): string {
  return [
    "Web3Forms is not set up yet.",
    "1) Go to web3forms.com and get your free Access Key",
    "2) Open .env.local and replace YOUR_ACCESS_KEY with that key",
    "3) Restart: npm run dev",
  ].join(" ");
}
