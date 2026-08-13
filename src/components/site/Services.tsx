import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { Reveal } from "@/components/motion-primitives";
import { FloatingDecor } from "@/components/site/FloatingDecor";
import { ServiceIcon, type IconName } from "@/components/site/ServiceIcons";
import { CountUp } from "@/components/site/CountUp";

const services: {
  name: string;
  price: number;
  time: string;
  desc: string;
  icon: IconName;
}[] = [
  {
    name: "Corte Assinatura",
    price: 18,
    time: "45 min",
    desc: "Diagnóstico capilar, corte à tesoura e máquina, finalização com produto.",
    icon: "scissors",
  },
  {
    name: "Barba Ritual",
    price: 12,
    time: "30 min",
    desc: "Toalha quente, navalha, óleos essenciais e hidratação profunda.",
    icon: "towel",
  },
  {
    name: "Combo Corte + Barba",
    price: 27,
    time: "75 min",
    desc: "Corte assinatura + barba ritual, com lavagem e massagem craniana.",
    icon: "comb",
  },
  {
    name: "Fade Técnico",
    price: 20,
    time: "50 min",
    desc: "Degradê milimétrico, contornos definidos à navalha e acabamento matte.",
    icon: "razor",
  },
];

const stats = [
  { value: "12k+", label: "cortes entregues" },
  { value: "4.9", label: "avaliação média" },
  { value: "6", label: "barbeiros mestres" },
  { value: "98%", label: "clientes recorrentes" },
];

function TiltCard({ service }: { service: (typeof services)[number] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [hover, setHover] = useState(false);
  const rx = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 220, damping: 20 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 8);
    rx.set(-py * 8);
  }

  function reset() {
    rx.set(0);
    ry.set(0);
    setHover(false);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={reset}
      {...(reduce ? {} : { style: { rotateX: rx, rotateY: ry, transformPerspective: 900 } })}
      className={`soft-card group relative h-full p-7 ${hover ? "shadow-[var(--shadow-glow)]" : ""}`}
    >
      <div className="flex items-start justify-between gap-6">
        <h3 className="text-xl font-semibold">{service.name}</h3>
        <span className="font-display text-2xl font-bold text-primary">
          <CountUp value={service.price} />
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
      <div className="mt-6 flex items-center justify-between gap-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-3">
          <span className="rounded-full bg-secondary px-3 py-1">{service.time}</span>
          <span className="translate-x-0 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
            agendar →
          </span>
        </span>
        <ServiceIcon name={service.icon} active={hover} />
      </div>
    </motion.article>
  );
}

export function Services() {
  return (
    <section id="servicos" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="hairline-x absolute inset-x-6 top-0" />
      <FloatingDecor preset="services" />

      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-end">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Serviços</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1]">
            Fazemos pouco.
            <br />
            Fazemos bem.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-muted-foreground md:pb-3">
            Cada serviço tem o seu tempo na agenda — sem sobreposições, sem pressa. O preço inclui
            produto, bebida e um acabamento que aguenta semanas.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {services.map((s, i) => (
          <Reveal key={s.name} delay={i * 0.07}>
            <TiltCard service={s} />
          </Reveal>
        ))}
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="bg-background">
            <div className="px-6 py-8 text-center transition-colors duration-500 hover:bg-secondary/60">
              <p className="font-display text-3xl font-bold sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
