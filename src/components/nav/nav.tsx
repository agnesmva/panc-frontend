"use client"; // Obrigatório para componentes que usam hooks e interatividade

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react'; // Ícone do Hamburger

// --- Componentes Shadcn ---
import {
  Sheet,
  SheetClose, // Componente para fechar o menu
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from '@/components/ui/button';
// --- Fim Componentes Shadcn ---

// Array único para os itens de navegação
const navItems = [
  { path: '/home', label: 'Início' },
  { path: '/recipes', label: 'Receitas' },
  { path: '/catalog', label: 'Catálogo' },
  { path: '/login', label: 'Entrar' },
];

function Nav() {
  // Hook do Next.js para ler o caminho atual
  const pathname = usePathname(); 

  // Função para verificar se o link está ativo
  const isActive = (path: string) => pathname === path;

  // ===================================
  // LÓGICA DE AUTO-OCULTAR INSERIDA AQUI
  // ===================================
  // 1. Verifica se a URL atual começa com /dashboard
  const isDashboard = pathname.startsWith('/dashboard');

  // 2. Se for, o componente <Nav> não renderiza NADA.
  if (isDashboard) {
    return null;
  }
  // ===================================
  // FIM DA LÓGICA
  // ===================================

  // 3. Se NÃO for dashboard, renderiza o Nav normalmente:
  return (
    // Cores primárias do seu tailwind.config
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home">
              {/* Corrigido h-15 para h-16 (classe válida do Tailwind) */}
              <img 
                className="h-16 w-auto cursor-pointer" 
                src="https://res.cloudinary.com/dwkzysoyd/image/upload/v1763055410/b362cc_57e359e57ad241fea682c3df2c2384b0_mv2_edm8pe.png"
                alt="Logo"
              />
            </Link>
          </div>
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path} // <Link> usa a prop 'href'
                className={`${isActive(item.path) 
                  ? 'text-[#b6ca59] border-b-2 border-[#b6ca59]' 
                  : 'text-primary-black hover:text-[#b6ca59]'} 
                  font-medium pb-1 transition duration-300`}
              >
                {item.label}
              </Link>
            ))}
          </div>


          {/* ================================== */}
          {/* MENU MOBILE (com Shadcn Sheet)     */}
          {/* ================================== */}
          <div className="md:hidden">
            {/* O Sheet cuida de todo o estado de abrir/fechar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6 text-primary-black" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>
                    <img 
                      className="h-16 w-auto rounded-full" 
                      src="https://res.cloudinary.com/dwkzysoyd/image/upload/v1749610754/Branco_kec5wp.png"
                      alt="Logo"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 pt-8">
                  {navItems.map((item) => (
                    // SheetClose envolve o Link para fechar
                    // o menu automaticamente ao clicar
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-lg transition
                          ${isActive(item.path) 
                            ? 'bg-muted font-bold text-primary' 
                            : 'text-muted-foreground hover:bg-muted'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Nav;