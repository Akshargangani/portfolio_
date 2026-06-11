import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.documentElement.classList.add("no-cursor");
    let x = innerWidth / 2, y = innerHeight / 2;
    let rx = x, ry = y;
    let raf = 0;
    let hover = false;

    const move = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      hover = !!t.closest("a,button,[data-cursor='hover']");
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      if (ring.current) {
        const s = hover ? 1.8 : 1;
        ring.current.style.transform = `translate(${rx}px,${ry}px) scale(${s})`;
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("no-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary mix-blend-screen"
        style={{ boxShadow: "0 0 12px var(--neon)" }}
      />
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[199] -ml-5 -mt-5 h-10 w-10 rounded-full border border-primary/60 mix-blend-screen transition-[border-color] duration-200"
        style={{ boxShadow: "0 0 24px -4px var(--neon)" }}
      />
    </>
  );
}
