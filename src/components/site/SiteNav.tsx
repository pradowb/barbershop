import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { label: "Serviços", href: "#servicos" },
  { label: "Estúdio", href: "#estudio" },
  { label: "Planos", href: "#planos" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4"
    >
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-500 sm:px-6 ${
          scrolled ? "glass-panel elevated" : "border border-transparent"
        }`}
      >
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          NAVALHA<span className="text-primary">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="story-link text-sm text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#agendar"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.04] active:scale-95"
        >
          Agendar
        </a>
      </nav>
    </motion.header>
  );
}
