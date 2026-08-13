import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/motion-primitives";
import { FloatingDecor } from "@/components/site/FloatingDecor";
import { supabase } from "@/integrations/supabase/client";
import { SERVICES, whatsappLink } from "@/lib/contact";

const OPEN_HOUR = 10;
const CLOSE_HOUR = 20;
const WEEK_DAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function isOpen(date: Date) {
  const d = date.getDay();
  return d >= 2 && d <= 6; // Ter–Sáb
}

function nextDays(count: number) {
  const out: Date[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  while (out.length < count) {
    if (isOpen(cursor)) out.push(new Date(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }
  return out;
}

function toDayKey(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate(),
  ).padStart(2, "0")}`;
}

type Taken = { starts_at: string; duration_minutes: number };

export function Booking() {
  const days = useMemo(() => nextDays(12), []);
  const reduce = useReducedMotion();
  const [service, setService] = useState<(typeof SERVICES)[number]>(SERVICES[0]);
  const [day, setDay] = useState(days[0]!);
  const [slot, setSlot] = useState<Date | null>(null);
  const [taken, setTaken] = useState<Taken[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [wipe, setWipe] = useState(false);

  useEffect(() => {
    let active = true;
    setSlot(null);
    supabase
      .rpc("get_taken_slots", { day: toDayKey(day) })
      .then(({ data }) => {
        if (active) setTaken((data as Taken[] | null) ?? []);
      });
    return () => {
      active = false;
    };
  }, [day]);

  const slots = useMemo(() => {
    const out: { date: Date; free: boolean }[] = [];
    const step = 30;
    const now = Date.now();
    for (let m = OPEN_HOUR * 60; m + service.duration <= CLOSE_HOUR * 60; m += step) {
      const date = new Date(day);
      date.setHours(0, m, 0, 0);
      const start = date.getTime();
      const end = start + service.duration * 60000;
      const overlaps = taken.some((t) => {
        const ts = new Date(t.starts_at).getTime();
        return start < ts + t.duration_minutes * 60000 && ts < end;
      });
      out.push({ date, free: !overlaps && start > now + 30 * 60000 });
    }
    return out;
  }, [day, service, taken]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!slot) return;
    setStatus("sending");
    const { error } = await supabase.from("bookings").insert({
      service: service.name,
      starts_at: slot.toISOString(),
      duration_minutes: service.duration,
      customer_name: name.trim(),
      customer_phone: phone.trim(),
    });
    if (error) {
      setStatus("error");
      setMessage(
        error.code === "23505" || error.message.includes("duplicate")
          ? "Esse horário acabou de ser ocupado. Escolhe outro, por favor."
          : "Não foi possível registar a marcação. Tenta novamente.",
      );
      return;
    }

    if (!reduce) {
      setWipe(true);
      await new Promise((r) => setTimeout(r, 620));
      setWipe(false);
    }

    setStatus("done");
    setMessage("Marcação registada. Confirma no WhatsApp e a cadeira é tua.");
    setTaken((prev) => [
      ...prev,
      { starts_at: slot.toISOString(), duration_minutes: service.duration },
    ]);
    const text = `Olá! Marcação: ${service.name} — ${day.toLocaleDateString("pt-PT", {
      weekday: "long",
      day: "2-digit",
      month: "long",
    })} às ${slot.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}. Nome: ${name.trim()}.`;
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="agendar" className="relative mx-auto max-w-6xl px-6 pb-28 sm:pb-36">
      <FloatingDecor preset="booking" />
      <Reveal>
        <div className="glass-panel elevated relative overflow-hidden rounded-3xl px-6 py-14 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />

          <AnimatePresence>
            {wipe && (
              <motion.div
                aria-hidden
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 z-30 flex items-center justify-center bg-primary"
              >
                <span className="font-display text-2xl font-bold text-primary-foreground">
                  Corte marcado.
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative text-center">
            <p className="text-xs uppercase tracking-[0.24em] text-primary">Agendar</p>
            <h2 className="mt-4 text-[clamp(2rem,6vw,3.5rem)] font-bold leading-[1]">
              A cadeira está livre.
              <br />
              A tua desculpa, não.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
              Escolhe serviço, dia e hora. Confirmamos por WhatsApp em minutos.
            </p>
          </div>

          <form onSubmit={submit} className="relative mt-12 grid gap-10">
            <div>
              <h3 className="text-sm font-medium">1. Serviço</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <motion.button
                    key={s.name}
                    type="button"
                    onClick={() => setService(s)}
                    {...(reduce ? {} : { whileTap: { scale: 0.94 } })}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors duration-300 ${
                      service.name === s.name
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {s.name} · {s.price}€
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">2. Dia</h3>
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {days.map((d) => {
                  const active = toDayKey(d) === toDayKey(day);
                  return (
                    <motion.button
                      key={d.toISOString()}
                      type="button"
                      layout={!reduce}
                      onClick={() => setDay(d)}
                      {...(reduce
                        ? {}
                        : {
                            animate: { scale: active ? 1.06 : 1, y: active ? -4 : 0 },
                            whileTap: { scale: 0.94 },
                          })}
                      transition={{ type: "spring", stiffness: 380, damping: 26 }}
                      className={`shrink-0 rounded-2xl border px-4 py-3 text-center transition-colors duration-300 ${
                        active
                          ? "border-primary bg-secondary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="block text-[11px] uppercase tracking-widest text-muted-foreground">
                        {WEEK_DAYS[d.getDay()]}
                      </span>
                      <span className="font-display text-lg font-bold">{d.getDate()}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">3. Hora</h3>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-6">
                {slots.map((s) => (
                  <motion.button
                    key={s.date.toISOString()}
                    type="button"
                    disabled={!s.free}
                    onClick={() => setSlot(s.date)}
                    {...(reduce || !s.free ? {} : { whileTap: { scale: 0.93 } })}
                    className={`rounded-xl border px-2 py-2.5 text-sm transition-colors duration-300 ${
                      slot && slot.getTime() === s.date.getTime()
                        ? "border-primary bg-primary text-primary-foreground"
                        : s.free
                          ? "border-border hover:border-primary/50"
                          : `cursor-not-allowed border-border/40 text-muted-foreground line-through ${
                              reduce ? "opacity-30" : "cooling-slot"
                            }`
                    }`}
                  >
                    {s.date.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" })}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium">4. Contacto</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <input
                  required
                  minLength={2}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
                <input
                  required
                  minLength={6}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefone / WhatsApp"
                  className="rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-3">
              <motion.button
                type="submit"
                disabled={!slot || status === "sending"}
                {...(reduce ? {} : { whileTap: { scale: 0.94 }, whileHover: { scale: 1.03 } })}
                transition={{ type: "spring", stiffness: 600, damping: 18 }}
                className="rounded-full bg-primary px-8 py-3.5 text-sm font-medium text-primary-foreground transition-shadow duration-300 hover:shadow-[var(--shadow-glow)] disabled:opacity-40"
              >
                {status === "sending" ? "A afiar a navalha…" : "Reservar e confirmar no WhatsApp"}
              </motion.button>
              {message && (
                <p
                  className={`text-sm ${status === "error" ? "text-primary" : "text-muted-foreground"}`}
                  role="status"
                >
                  {message}
                </p>
              )}
            </div>
          </form>
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
