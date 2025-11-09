"use client";

import * as React from "react";
// 1. Ícones (Search)
import { Search } from "lucide-react";

// 2. Componentes Command do shadcn
import {
  Command,
  CommandDialog, // Usaremos o Dialog para o visual "modal" do ⌘K
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// --- DADOS DE EXEMPLO ---
const MOCK_PLANTS = [
  {
    value: "ora-pro-nobis",
    label: "Ora-pro-nóbis",
  },
  {
    value: "peixinho-da-horta",
    label: "Peixinho-da-horta",
  },
  {
    value: "moringa",
    label: "Moringa",
  },
  {
    value: "beldroega",
    label: "Beldroega",
  },
  {
    value: "taioba",
    label: "Taioba",
  },
  {
    value: "capuchinha",
    label: "Capuchinha",
  },
];
// --- FIM DOS DADOS DE EXEMPLO ---

/**
 * PlantSearch (Estilo Comando/K)
 * Uma barra de pesquisa que abre um modal de comando (CommandDialog).
 */
function PlantSearch() {
  const [open, setOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Efeito para abrir o modal com (⌘K or Ctrl+K)
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  // Foca no input quando o diálogo abre
  React.useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100); // Pequeno delay para garantir que o diálogo esteja renderizado
    }
  }, [open]);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* 1. O "falso" input que o usuário vê (Estilo da imagem) */}
      <div
        className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 hover:cursor-text"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-center">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <span>Pesquisar planta...</span>
        </div>
      </div>

      {/* 2. O Diálogo de Comando (o modal que abre) */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          ref={inputRef}
          placeholder="Pesquisar planta..." 
        />
        <CommandList>
          <CommandEmpty>Nenhuma planta encontrada.</CommandEmpty>
          <CommandGroup heading="Sugestões">
            {MOCK_PLANTS.map((plant) => (
              <CommandItem
                key={plant.value}
                value={plant.value} // O valor usado para a pesquisa
                onSelect={(currentValue) => {
                  // Quando um item é selecionado:
                  setOpen(false); // Fecha o modal
                  
                  // TODO: Adicione sua lógica de navegação aqui
                  // Ex: router.push(`/planta/${currentValue}`)
                  console.log("Planta selecionada:", currentValue);
                }}
              >
                {plant.label} {/* O texto que o usuário vê */}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}

export default PlantSearch;