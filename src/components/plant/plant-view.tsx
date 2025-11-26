<<<<<<< HEAD
"use client"; // Carrosséis são interativos, então precisam ser Client Components

import * as React from "react";

// Importa os componentes do shadcn que acabamos de adicionar
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Usaremos o Card para dar um enquadramento bonito para as imagens
import { Card, CardContent } from "@/components/ui/card";

// --- DADOS DE EXEMPLO ---
// Em um aplicativo real, você receberia isso via props ou de uma API
const MOCK_PLANT_IMAGES = [
  {
    src: "https://placehold.co/600x600/22c55e/ffffff?text=Planta+Foto+1",
    alt: "Foto 1 da planta: vista frontal",
  },
  {
    src: "https://placehold.co/600x600/a3e635/000000?text=Planta+Foto+2",
    alt: "Foto 2 da planta: detalhe da folha",
  },
  {
    src: "https://placehold.co/600x600/84cc16/ffffff?text=Planta+Foto+3",
    alt: "Foto 3 da planta: florescimento",
  },
  {
    src: "https://placehold.co/600x600/16a34a/ffffff?text=Planta+Foto+4",
    alt: "Foto 4 da planta: com vaso",
  },
];
// --- FIM DOS DADOS DE EXEMPLO ---


/**
 * PlantView
 * Um componente de carrossel para exibir uma galeria de fotos da planta.
 */
function PlantView() {
  return (
    // Definimos uma largura máxima para o carrossel não ficar gigante em telas grandes
    <div className="w-full max-w-lg mx-auto py-8">
      
      <Carousel 
        className="w-full"
        // 'opts' são opções do Embla. 'loop: true' faz o carrossel ser infinito.
        opts={{
          loop: true,
        }}
      >
        <CarouselContent>
          {/* Fazemos um loop nas nossas imagens de exemplo */}
          {MOCK_PLANT_IMAGES.map((image, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                {/* Usamos o Card para enquadrar a imagem */}
                <Card>
                  {/* - 'aspect-square' força a imagem a ser um quadrado perfeito.
                    - 'p-0' remove o padding padrão do CardContent.
                    - 'overflow-hidden rounded-lg' garante que a imagem não vaze
                      das bordas arredondadas do Card.
                  */}
                  <CardContent className="flex aspect-square items-center justify-center p-0 overflow-hidden rounded-lg">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Botões de Navegação (Anterior / Próximo) */}
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      
      </Carousel>
    </div>
  );
}

export default PlantView;
=======
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
>>>>>>> origin/pancjoao
