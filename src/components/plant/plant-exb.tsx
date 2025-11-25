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
