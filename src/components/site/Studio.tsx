import { Parallax, Reveal } from "@/components/motion-primitives";
import cut1 from "@/assets/cut-1.jpg";
import cut2 from "@/assets/cut-2.jpg";
import cut3 from "@/assets/cut-3.jpg";

const shots = [
  { src: cut1, alt: "Cliente com fade moderno e barba alinhada", caption: "Fade técnico" },
  { src: cut2, alt: "Barbeiro a alinhar barba com navalha", caption: "Barba à navalha" },
  { src: cut3, alt: "Ferramentas de barbeiro em superfície escura", caption: "Ferramenta afiada" },
];

export function Studio() {
  return (
    <section id="estudio" className="relative overflow-hidden py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">O estúdio</p>
          <h2 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1]">
            Ambiente calmo, resultado afiado.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={s.caption} delay={i * 0.08}>
              <figure className="group relative overflow-hidden rounded-3xl border border-border">
                <Parallax distance={i === 1 ? 28 : 16}>
                  <img
                    src={s.src}
                    alt={s.alt}
                    width={900}
                    height={1200}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[3/4] w-full scale-110 object-cover transition-transform duration-700 group-hover:scale-[1.16]"
                  />
                </Parallax>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                <figcaption className="absolute bottom-5 left-5 text-sm font-medium tracking-tight">
                  {s.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
