import { createFileRoute } from "@tanstack/react-router";
import { SiteNav } from "@/components/site/SiteNav";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { Studio } from "@/components/site/Studio";
import { Plans } from "@/components/site/Plans";
import { Booking, SiteFooter } from "@/components/site/Booking";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Navalha — Barbearia premium em Lisboa" },
      {
        name: "description",
        content:
          "Barbearia de autor em Lisboa: corte assinatura, barba à navalha e planos mensais. Agenda com tempo dedicado a cada cliente.",
      },
      { property: "og:title", content: "Navalha — Barbearia premium em Lisboa" },
      {
        property: "og:description",
        content:
          "Corte de precisão, barba ritual e planos mensais numa barbearia de autor no Chiado.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <SiteNav />
      <Hero />
      <Services />
      <Studio />
      <Plans />
      <Booking />
      <SiteFooter />
    </main>
  );
}
