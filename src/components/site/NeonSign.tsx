import { useReducedMotion } from "framer-motion";

export function NeonSign({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: "rotate(-3deg)" }}
    >
      <span
        className={`font-display text-2xl font-bold uppercase tracking-[0.22em] text-primary sm:text-3xl ${
          reduce ? "text-glow" : "neon-flicker"
        }`}
        style={{ textShadow: "0 0 18px color-mix(in oklab, var(--primary) 60%, transparent)" }}
      >
        Stay Sharp
      </span>
      <span className="mt-2 block h-px w-full bg-primary/50" />
    </div>
  );
}
