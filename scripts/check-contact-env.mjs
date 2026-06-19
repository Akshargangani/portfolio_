import { loadEnv } from "vite";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const root = process.cwd();
const env = loadEnv("development", root, "");
const key = env.VITE_WEB3FORMS_ACCESS_KEY || env.WEB3FORMS_ACCESS_KEY || "";
const placeholders = ["YOUR_ACCESS_KEY", "your_web3forms", "your_access_key"];
const ok = key && !placeholders.some((p) => key.includes(p));

console.log("\n📧 Contact form env check\n");
console.log("  .env.local exists:", existsSync(resolve(root, ".env.local")) ? "yes" : "NO — create it");
console.log("  WEB3FORMS key set:  ", ok ? "yes ✓" : "NO — fix .env.local");
console.log("  CONTACT_EMAIL:      ", env.CONTACT_EMAIL || env.VITE_CONTACT_EMAIL || "(missing)");

if (!ok) {
  console.log("\n→ Get key: https://web3forms.com");
  console.log("→ Add to .env.local:");
  console.log("    VITE_WEB3FORMS_ACCESS_KEY=your-real-key");
  console.log("    WEB3FORMS_ACCESS_KEY=your-real-key");
  console.log("→ Then: npm run dev\n");
  process.exit(1);
}

console.log("\n✓ Contact form is configured. Run npm run dev and test /contact\n");
