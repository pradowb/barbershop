import { Reveal } from "@/components/motion-primitives";

const plans = [
  {
    name: "Avulso",
    price: "28€",
    note: "por visita",
    items: ["Corte assinatura", "Bebida incluída", "Agenda online"],
    featured: false,
  },
  {
    name: "Clube Navalha",
    price: "69€",
    note: "por mês",
    items: [
      "2 cortes + 1 barba",
      "Prioridade na agenda",
      "15% em produtos",
      "Acabamento livre entre visitas",
    ],
    featured: true,
  },
  {
    name: "Executivo",
    price: "129€",
    note: "por mês",
    items: ["Visitas ilimitadas", "Barbeiro dedicado", "Horário fora de expediente"],
    featured: false,
  },
];

export function Plans() {
  return (
    <section id="planos" className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <div className="hairline-x absolute inset-x-6 top-0" />
      <Reveal className="max-w-xl">
        <p className="text-xs uppercase tracking-[0.24em] text-primary">Planos</p>
        <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1]">
          Assine o hábito, não a pressa.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08}>
            <article
              className={`soft-card relative flex h-full flex-col p-8 ${
                p.featured ? "shadow-[var(--shadow-glow)]" : ""
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[11px] font-medium text-primary-foreground">
                  Mais escolhido
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-5 flex items-end gap-2">
                <span className="font-display text-4xl font-bold">{p.price}</span>
                <span className="pb-1 text-xs text-muted-foreground">{p.note}</span>
              </p>
              <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                {p.items.map((it) => (
                  <li key={it} className="flex items-start gap-3">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {it}
                  </li>
                ))}
              </ul>
              <a
                href="#agendar"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-medium transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                  p.featured
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-foreground hover:border-primary/50"
                }`}
              >
                Escolher {p.name}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
