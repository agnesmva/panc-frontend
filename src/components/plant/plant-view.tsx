"use client";
import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { PLANTS } from "./plant-data";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlantView({
  selectedPlant,
  onSelect,
}: {
  selectedPlant: string;
  onSelect: (id: string) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  // Atualiza descrição quando slide muda (setas ou swipe)
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelectSlide = () => {
      const index = emblaApi.selectedScrollSnap();
      const plant = PLANTS[index];
      if (plant) onSelect(plant.id);
    };
    emblaApi.on("select", onSelectSlide);
    onSelectSlide(); // inicializa com o primeiro slide
    return () => {
      emblaApi.off("select", onSelectSlide);
    };
  }, [emblaApi, onSelect]);

  // Pesquisa → rola até índice correto
  React.useEffect(() => {
    if (selectedPlant && emblaApi) {
      const index = PLANTS.findIndex((p) => p.id === selectedPlant);
      if (index >= 0) emblaApi.scrollTo(index);
    }
  }, [selectedPlant, emblaApi]);

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Área do carrossel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {PLANTS.map((plant, index) => (
            <div
              className="flex-[0_0_100%] px-2"
              key={index}
              onClick={() => onSelect(plant.id)}
            >
              {/* altura proporcional à tela */}
              <div className="h-[58vh] rounded-lg overflow-hidden">
                <img
                  src={plant.img}
                  alt={plant.nome}
                  className="w-full h-full object-cover cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Botão esquerda */}
      <button
        className="absolute top-1/2 -translate-y-1/2 left-2 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition"
        onClick={() => emblaApi && emblaApi.scrollPrev()}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Botão direita */}
      <button
        className="absolute top-1/2 -translate-y-1/2 right-2 bg-black/40 text-white rounded-full p-3 hover:bg-black/60 transition"
        onClick={() => emblaApi && emblaApi.scrollNext()}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
