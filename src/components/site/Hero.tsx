import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero.jpg";
import { HERO_VIDEO_URL } from "@/lib/media";
import { NeonSign } from "@/components/site/NeonSign";

const EASE = [0.22, 1, 0.36, 1] as const;

const words = ["Barbearia", "Social", "Fade"];
const HIGHLIGHT_INDEX = 2;

function RazorIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 20 L18 6 l3 3 L7 23 z" />
      <path d="M19 4 l3.5 3.5" />
    </svg>
  );
}

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative isolate min-h-[100svh] overflow-hidden cursor-razor"
    >
      <motion.div
        className="absolute inset-0 -z-20"
        {...(reduce ? {} : { style: { y: imageY } })}
      >
        {reduce ? (
          <img
            src={heroImage}
            alt="Interior de barbearia premium com iluminação vermelha"
            width={1600}
            height={1200}
            fetchPriority="high"
            decoding="async"
            className="size-full scale-105 object-cover"
          />
        ) : (
          <video
            src={HERO_VIDEO_URL}
            poster={heroImage}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-hidden
            className="size-full scale-105 object-cover"
          />
        )}
      </motion.div>
      <div className="hero-veil absolute inset-0 -z-10" />

      <NeonSign className="absolute right-6 top-28 z-10 hidden sm:block" />

      <motion.div
        {...(reduce ? {} : { style: { y: contentY, opacity: contentOpacity } })}
        className="mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-6 pb-20 pt-32 sm:pb-28"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass-panel mb-8 inline-flex w-fit items-center gap-2 rounded-full px-3 py-1.5 text-xs tracking-wide text-muted-foreground"
        >
          <span className={`size-1.5 rounded-full bg-primary ${reduce ? "" : "live-dot"}`} />
          Lisboa · desde 2014
        </motion.span>

        <h1 className="max-w-3xl text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.92]">
          {words.map((w, i) =>
            i === 2 ? (
              <span key={w + i} className="relative mr-[0.25em] inline-block">
                <motion.span
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
                  animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
                  transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                  className="inline-block text-primary text-glow"
                >
                  {w}
                </motion.span>
                {!reduce && (
                  <motion.span
                    aria-hidden
                    initial={{ left: "0%", opacity: 0 }}
                    animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
                    transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
                    className="pointer-events-none absolute inset-y-1 w-[3px] bg-foreground shadow-[0_0_18px_var(--primary)]"
                  />
                )}
              </span>
            ) : (
              <motion.span
                key={w + i}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE }}
                className="mr-[0.25em] inline-block"
              >
                {w}
              </motion.span>
            ),
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Barbearia de autor. Tempo a sério para cada cabeça — sem pressa, sem conversa de
          circunstância, sem cortes a metade.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#agendar"
            className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] active:scale-95"
          >
            <span className="relative z-10">Reservar horário</span>
            <RazorIcon className="relative z-10 size-4 transition-transform duration-500 group-hover:translate-x-1.5 group-hover:-rotate-12" />
            <span className="absolute inset-0 -translate-x-full bg-foreground/15 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#servicos"
            className="rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground/90 transition-colors duration-300 hover:border-primary/50 hover:text-foreground"
          >
            Sem enrolação
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
