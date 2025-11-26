<<<<<<< HEAD
import PlantView from '@/components/plant/plant-view'
import PlantInfo from '@/components/plant/plant-info'
import PlantSearch from './plant-search'

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-6 py-6 md:px-10 lg:py-32">
      <PlantSearch />
      {/* Layout responsivo: 
        - Telas pequenas: Carrossel em cima, Info embaixo.
        - Telas grandes (lg): Lado a lado.
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
        
        {/* Coluna 1: Carrossel de Fotos */}
        <div className="flex items-center justify-center h-auto">
          <PlantView />
        </div>
        
        {/* Coluna 2: Informações da Planta */}
        <div className="flex items-center justify-center h-auto">
          <PlantInfo />
        </div>
        
      </div>
    </div>
  )
}
=======
"use client";
import * as React from "react";
import PlantView from "./plant-view";
import PlantInfo from "./plant-info";
import PlantSearch from "./plant-search";

export default function DashboardPage() {
  const [selectedPlant, setSelectedPlant] = React.useState("ora-pro-nobis");

  return (
    <div className="flex flex-col items-center gap-6 p-4">
      {/* Barra de pesquisa centralizada no topo */}
      <PlantSearch onSelect={setSelectedPlant} />

      {/* Layout responsivo: carrossel e descrição lado a lado em telas grandes */}
      <div className="grid lg:grid-cols-2 gap-6 w-full items-center">
        <PlantView selectedPlant={selectedPlant} onSelect={setSelectedPlant} />
        <PlantInfo selectedPlant={selectedPlant} />
      </div>
    </div>
  );
}
>>>>>>> origin/pancjoao
