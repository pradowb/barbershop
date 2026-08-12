import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;

const words = ["Corte", "de", "precisão", "cirúrgica."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="top" ref={ref} className="relative isolate min-h-[100svh] overflow-hidden">
      <motion.img
        src={heroImage}
        alt="Interior de barbearia premium com iluminação vermelha"
        width={1600}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full scale-105 object-cover"
        {...(reduce ? {} : { style: { y: imageY } })}
      />
      <div className="hero-veil absolute inset-0 -z-10" />

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
          <span className="size-1.5 rounded-full bg-primary" />
          Lisboa · desde 2014
        </motion.span>

        <h1 className="max-w-3xl text-[clamp(2.75rem,9vw,7rem)] font-bold leading-[0.92]">
          {words.map((w, i) => (
            <motion.span
              key={w + i}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease: EASE }}
              className={`mr-[0.25em] inline-block ${i === 2 ? "text-primary text-glow" : ""}`}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Barbearia de autor. Técnica, produto e tempo dedicados a um único resultado: o seu
          melhor corte.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#agendar"
            className="group relative overflow-hidden rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] active:scale-95"
          >
            <span className="relative z-10">Reservar horário</span>
            <span className="absolute inset-0 -translate-x-full bg-foreground/15 transition-transform duration-500 group-hover:translate-x-0" />
          </a>
          <a
            href="#servicos"
            className="rounded-full border border-border px-7 py-3.5 text-sm font-medium text-foreground/90 transition-colors duration-300 hover:border-primary/50 hover:text-foreground"
          >
            Ver serviços
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
