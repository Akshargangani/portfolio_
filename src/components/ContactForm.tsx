import { Reveal } from "./Reveal";
import { useEffect, useState } from "react";
import { Send, Check, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import {
  submitContactMessage,
  formatContactValidationError,
  CONTACT_INBOX,
} from "@/lib/contact";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    Promise.resolve({ json: () => Promise.resolve({ configured: true }) })
      .then((res) => res.json())
      .then((data: { configured?: boolean }) => setIsConfigured(Boolean(data.configured)))
      .catch(() => setIsConfigured(null));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = (formData.get("name") as string)?.trim() ?? "";
    const email = (formData.get("email") as string)?.trim() ?? "";
    const company = (formData.get("company") as string)?.trim() || undefined;
    const message = (formData.get("message") as string)?.trim() ?? "";

    if (!name || !email || !message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }

    setLoading(true);

    try {
      await submitContactMessage({ name, email, company, message });
      setSent(true);
      form.reset();
      toast.success("Message sent!", {
        description: `Thanks — I'll reply to ${email} within 24 hours.`,
      });
    } catch (err) {
      setSent(false);
      toast.error("Could not send message", {
        description: formatContactValidationError(err),
      });
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-4xl px-6 py-24">
      <Reveal>
        <div className="mb-10 text-center">
          <div className="text-xs uppercase tracking-[0.4em] text-primary">Get in touch</div>
          <h2 className="mt-3 font-display text-4xl font-semibold md:text-6xl">
            Let&apos;s build something <span className="text-gradient">unforgettable</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Tell me about your project. Messages go straight to my inbox — replies within 24 hours.
          </p>
        </div>
      </Reveal>

      <Reveal>
        <form
          onSubmit={handleSubmit}
          noValidate
          className="relative rounded-3xl glass-strong p-8 md:p-10 neon-border"
        >
          {isConfigured === false && (
            <div className="mb-6 flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
              <AlertCircle className="mt-0.5 shrink-0" size={18} />
              <div>
                <p className="font-medium">Web3Forms key required</p>
                <p className="mt-1 text-amber-200/80">
                  Get a free key at{" "}
                  <a
                    href="https://web3forms.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    web3forms.com
                  </a>
                  , paste it in <code className="text-xs">.env.local</code> as{" "}
                  <code className="text-xs">VITE_WEB3FORMS_ACCESS_KEY</code>, then restart{" "}
                  <code className="text-xs">npm run dev</code>.
                </p>
              </div>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <Field
              label="Your name"
              id="name"
              name="name"
              placeholder="Your name"
              disabled={loading}
              minLength={2}
            />
            <Field
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="you@email.com"
              disabled={loading}
            />
          </div>
          <div className="mt-5">
            <Field
              label="Company (optional)"
              id="company"
              name="company"
              placeholder="Company name"
              required={false}
              disabled={loading}
            />
          </div>
          <div className="mt-5">
            <label
              htmlFor="message"
              className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground"
            >
              Project details
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              minLength={10}
              disabled={loading}
              placeholder="Tell me about timeline, scope, and goals…"
              className="w-full resize-none rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-transparent transition-all placeholder:text-muted-foreground/70 focus:bg-white/10 focus:ring-primary/60 disabled:opacity-60"
            />
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              Or email directly:{" "}
              <a href={`mailto:${CONTACT_INBOX}`} className="text-primary hover:underline">
                {CONTACT_INBOX}
              </a>
            </p>
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground glow transition-all hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : sent ? (
                <>
                  <Check size={16} /> Message sent
                </>
              ) : (
                <>
                  Send message <Send size={14} className="transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </form>
      </Reveal>
    </section>
  );
}

function Field({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required = true,
  disabled = false,
  minLength,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  minLength?: number;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        minLength={minLength}
        placeholder={placeholder}
        className="w-full rounded-2xl bg-white/5 px-4 py-3 text-sm outline-none ring-1 ring-transparent transition-all placeholder:text-muted-foreground/70 focus:bg-white/10 focus:ring-primary/60 disabled:opacity-60"
      />
    </div>
  );
}
