"use client";
import * as React from "react";
import { PLANTS } from "./plant-data";

export default function PlantInfo({ selectedPlant }: { selectedPlant: string }) {
  const plant = PLANTS.find(p => p.id === selectedPlant) || PLANTS[0];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-4 border rounded-lg bg-white shadow-md max-w-md text-center">
        <h2 className="text-xl font-bold">{plant.nome}</h2>
        <p className="italic text-gray-600">{plant.cientifico}</p>
        <p className="mt-2">{plant.descricao}</p>
        <h3 className="mt-4 font-semibold">Receitas sugeridas:</h3>
        <ul className="list-disc list-inside text-left">
          {plant.receitas.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
