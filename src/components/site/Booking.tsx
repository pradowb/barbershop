import { Reveal } from "@/components/motion-primitives";

export function Booking() {
  return (
    <section id="agendar" className="relative mx-auto max-w-6xl px-6 pb-28 sm:pb-36">
      <Reveal>
        <div className="glass-panel elevated relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16 sm:py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <h2 className="relative text-[clamp(2rem,6vw,4rem)] font-bold leading-[0.98]">
            A cadeira está livre.
          </h2>
          <p className="relative mx-auto mt-5 max-w-md text-muted-foreground">
            Reserve em menos de um minuto. Confirmação imediata e lembrete no dia anterior.
          </p>
          <div className="relative mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+351210000000"
              className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:scale-[1.03] hover:shadow-[var(--shadow-glow)] active:scale-95"
            >
              Reservar agora
            </a>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-full border border-border px-8 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-primary/50"
            >
              Ver localização
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-display text-base font-bold text-foreground">
          NAVALHA<span className="text-primary">.</span>
        </p>
        <p>Rua do Alecrim 42, Lisboa · Ter–Sáb, 10h–20h</p>
        <p>© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
