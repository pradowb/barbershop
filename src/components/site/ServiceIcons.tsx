import { motion, useReducedMotion } from "framer-motion";

const paths: Record<string, string[]> = {
  razor: ["M4 20 L18 6 l3 3 L7 23 z", "M19 4 l4 4 -2.5 2.5 -4-4z"],
  scissors: [
    "M6 4 L18 20",
    "M18 4 L6 20",
    "M6.5 22 a2.5 2.5 0 1 0 0-5 a2.5 2.5 0 0 0 0 5z",
    "M17.5 22 a2.5 2.5 0 1 0 0-5 a2.5 2.5 0 0 0 0 5z",
  ],
  comb: ["M3 9 h18 v4 H3 z", "M6 13 v6", "M10 13 v6", "M14 13 v6", "M18 13 v6"],
  towel: ["M4 6 h16 v12 a4 4 0 0 1 -4 4 H8 a4 4 0 0 1 -4 -4 z", "M4 10 h16", "M9 6 v16"],
};

export type IconName = keyof typeof paths;

export function ServiceIcon({ name, active }: { name: IconName; active: boolean }) {
  const reduce = useReducedMotion();
  const d = paths[name] ?? paths["razor"]!;

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-9 text-primary"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {d.map((p, i) => (
        <motion.path
          key={p}
          d={p}
          initial={false}
          animate={
            reduce
              ? { pathLength: 1, opacity: active ? 1 : 0.35 }
              : { pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }
          }
          transition={{ duration: 0.45, delay: active ? i * 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </svg>
  );
}
