import { useReducedMotion } from "framer-motion";

type Blob = { x: string; y: string; size: number; delay: number; kind: "foam" | "line" | "smoke" };

const PRESETS: Record<string, Blob[]> = {
  services: [
    { x: "6%", y: "12%", size: 120, delay: 0, kind: "foam" },
    { x: "88%", y: "30%", size: 90, delay: 3, kind: "line" },
    { x: "72%", y: "82%", size: 150, delay: 6, kind: "smoke" },
  ],
  plans: [
    { x: "82%", y: "10%", size: 110, delay: 1, kind: "foam" },
    { x: "10%", y: "70%", size: 140, delay: 4, kind: "smoke" },
  ],
  booking: [
    { x: "4%", y: "24%", size: 130, delay: 2, kind: "smoke" },
    { x: "92%", y: "62%", size: 100, delay: 5, kind: "line" },
  ],
};

function Shape({ kind, size }: { kind: Blob["kind"]; size: number }) {
  if (kind === "line") {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
        <path
          d="M4 62 C 26 30, 48 88, 96 34"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  if (kind === "smoke") {
    return (
      <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
        <path
          d="M30 92 C 18 70, 46 62, 34 42 C 24 26, 52 20, 46 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M62 92 C 52 74, 74 66, 64 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <circle cx="38" cy="42" r="20" fill="currentColor" />
      <circle cx="64" cy="34" r="12" fill="currentColor" />
      <circle cx="58" cy="62" r="16" fill="currentColor" />
      <circle cx="30" cy="70" r="9" fill="currentColor" />
    </svg>
  );
}

export function FloatingDecor({ preset }: { preset: keyof typeof PRESETS }) {
  const reduce = useReducedMotion();
  const blobs = PRESETS[preset] ?? [];

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute text-primary/[0.06] ${reduce ? "" : "float-drift"}`}
          style={{ left: b.x, top: b.y, animationDelay: `${b.delay}s` }}
        >
          <Shape kind={b.kind} size={b.size} />
        </div>
      ))}
    </div>
  );
}
