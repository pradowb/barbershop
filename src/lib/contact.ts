export const WHATSAPP_NUMBER = "351210000000"; // substituir pelo número real da barbearia
export const WHATSAPP_DISPLAY = "+351 210 000 000";

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const SERVICES = [
  { name: "Corte Assinatura", price: 18, duration: 45 },
  { name: "Barba Ritual", price: 12, duration: 30 },
  { name: "Combo Corte + Barba", price: 27, duration: 75 },
  { name: "Fade Técnico", price: 20, duration: 50 },
] as const;

export type ServiceName = (typeof SERVICES)[number]["name"];
