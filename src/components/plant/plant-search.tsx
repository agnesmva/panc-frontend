"use client";
import * as React from "react";
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { PLANTS } from "./plant-data";

export default function PlantSearch({ onSelect }: { onSelect: (id: string) => void }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="w-1/2 mx-auto"> {/* largura 50% e centralizado */}
      <div className="border p-2 rounded cursor-pointer text-center" onClick={() => setOpen(true)}>
        Pesquisar planta...
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite o nome da planta..." />
        <CommandList>
          <CommandEmpty>Nenhuma planta encontrada.</CommandEmpty>
          <CommandGroup>
            {PLANTS.map((plant) => (
              <CommandItem
                key={plant.id}
                onSelect={() => {
                  onSelect(plant.id);
                  setOpen(false);
                }}
              >
                {plant.nome}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
