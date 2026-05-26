import { createFileRoute } from "@tanstack/react-router";
import { SoftVancesLanding } from "@/components/softvances/Landing";

export const Route = createFileRoute("/")({
  component: SoftVancesLanding,
  head: () => ({
    meta: [
      { title: "SoftVances — Sites, automações e soluções digitais" },
      {
        name: "description",
        content:
          "SoftVances cria sites profissionais, automações inteligentes e soluções digitais para acelerar empresas.",
      },
    ],
  }),
});
