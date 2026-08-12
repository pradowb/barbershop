import { whatsappLink } from "@/lib/contact";

export function WhatsAppButton() {
  return (
    <a
      href={whatsappLink("Olá! Gostaria de marcar um corte na Navalha.")}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-3 text-sm font-medium backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:shadow-[var(--shadow-glow)] active:scale-95"
    >
      <svg viewBox="0 0 24 24" aria-hidden className="size-5 fill-current text-primary">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2Zm5.8 14.03c-.24.68-1.4 1.3-1.93 1.35-.53.05-1.03.08-2.9-.66-2.24-.9-3.66-3.2-3.77-3.35-.11-.15-.9-1.2-.9-2.3 0-1.1.58-1.63.78-1.86.2-.23.44-.29.59-.29h.42c.14 0 .32-.03.5.38.18.42.62 1.5.67 1.6.05.11.09.24.02.38-.07.15-.11.24-.22.37l-.33.39c-.11.11-.23.23-.1.45.13.23.58.96 1.24 1.55.85.76 1.57 1 1.8 1.11.22.11.35.09.48-.06.13-.15.56-.65.71-.88.15-.22.3-.18.5-.11.2.07 1.28.6 1.5.71.22.11.37.17.42.26.05.1.05.57-.19 1.25Z" />
      </svg>
      WhatsApp
    </a>
  );
}
