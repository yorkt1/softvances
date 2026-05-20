import { createFileRoute } from "@tanstack/react-router";
import { NeuralHero } from "@/components/NeuralHero";
import { Sections } from "@/components/Sections";
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SoftVances — Tecnologia que pensa por você" },
      {
        name: "description",
        content:
          "SoftVances cria sites premium, sistemas, automações e inteligência artificial com design cinematográfico e experiências interativas.",
      },
      { property: "og:title", content: "SoftVances — Tecnologia que pensa por você" },
      {
        property: "og:description",
        content:
          "Sites, sistemas, automações e IA com design futurista. Uma experiência neural interativa.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <NeuralHero />
      <Sections />
    </main>
  );
}
