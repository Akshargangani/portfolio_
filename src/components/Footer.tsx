import { Link, useNavigate } from "react-router-dom";

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-display text-2xl font-semibold text-gradient">AKSHAR<span className="text-primary">.</span></div>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Designing the next decade of digital products. Crafted with obsession in Lisbon & remote.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link to="/work" className="hover:text-foreground">Work</Link>
          <Link to="/about" className="hover:text-foreground">About</Link>
          <Link to="/contact" className="hover:text-foreground">Contact</Link>
          <a href="mailto:hello@akshar.dev" className="hover:text-foreground">hello@akshar.dev</a>
        </div>
      </div>
      <div className="border-t border-white/5 px-6 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Akshar Studio. All rights reserved.
      </div>
    </footer>
  );
}
