<<<<<<< HEAD
"use client"; // Obrigatório para componentes que usam hooks e interatividade

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Menu } from 'lucide-react'; // Ícone do Hamburger

// --- Componentes Shadcn ---
import {
  Sheet,
  SheetClose, // Componente para fechar o menu
=======
"use client"

import React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/AuthProvider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Menu } from "lucide-react"

import {
  Sheet,
  SheetClose,
>>>>>>> origin/pancjoao
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
<<<<<<< HEAD
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
=======
} from "@/components/ui/sheet"

// Itens fixos do menu (sem "Entrar")
const baseNavItems = [
  { path: "/home", label: "Início" },
  { path: "/recipes", label: "Receitas" },
  { path: "/catalog", label: "Catálogo" },
  { path: "/dashboard", label: "Dashboard" }, // <-- novo item
]

export default function Nav() {
  const pathname = usePathname() || "/"
  const router = useRouter()
  const { user, loading } = useAuth()

  async function handleLogout(e?: React.MouseEvent) {
    e?.preventDefault()
    await signOut(auth)
    router.replace("/login")
  }

  const isActive = (path: string) => pathname === path

  // Ocultar nav em /dashboard
  if (pathname.startsWith("/dashboard")) {
    return null
  }

  return (
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/home">
              <img
                className="h-16 w-auto cursor-pointer"
>>>>>>> origin/pancjoao
                src="https://res.cloudinary.com/dwkzysoyd/image/upload/v1763055410/b362cc_57e359e57ad241fea682c3df2c2384b0_mv2_edm8pe.png"
                alt="Logo"
              />
            </Link>
          </div>
<<<<<<< HEAD
          
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
=======

          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8 items-center">
            {baseNavItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`${
                  isActive(item.path)
                    ? "text-[#b6ca59] border-b-2 border-[#b6ca59]"
                    : "text-primary-black hover:text-[#b6ca59]"
                } font-medium pb-1 transition duration-300`}
>>>>>>> origin/pancjoao
              >
                {item.label}
              </Link>
            ))}
<<<<<<< HEAD
          </div>


          {/* ================================== */}
          {/* MENU MOBILE (com Shadcn Sheet)     */}
          {/* ================================== */}
          <div className="md:hidden">
            {/* O Sheet cuida de todo o estado de abrir/fechar */}
=======

            {/* Botão de login/logout */}
            {!loading && (
              user ? (
                <Button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white ml-4"
                >
                  Deslogar
                </Button>
              ) : (
                <Link
                  href="/login"
                  className={`${
                    isActive("/login")
                      ? "text-[#b6ca59] border-b-2 border-[#b6ca59]"
                      : "text-primary-black hover:text-[#b6ca59]"
                  } font-medium pb-1 transition duration-300`}
                >
                  Entrar
                </Link>
              )
            )}
          </div>

          {/* Menu Mobile */}
          <div className="md:hidden">
>>>>>>> origin/pancjoao
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
<<<<<<< HEAD
                    <img 
                      className="h-16 w-auto rounded-full" 
=======
                    <img
                      className="h-16 w-auto rounded-full"
>>>>>>> origin/pancjoao
                      src="https://res.cloudinary.com/dwkzysoyd/image/upload/v1749610754/Branco_kec5wp.png"
                      alt="Logo"
                    />
                  </SheetTitle>
                </SheetHeader>
                <div className="space-y-4 pt-8">
<<<<<<< HEAD
                  {navItems.map((item) => (
                    // SheetClose envolve o Link para fechar
                    // o menu automaticamente ao clicar
=======
                  {baseNavItems.map((item) => (
>>>>>>> origin/pancjoao
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-lg transition
<<<<<<< HEAD
                          ${isActive(item.path) 
                            ? 'bg-muted font-bold text-primary' 
                            : 'text-muted-foreground hover:bg-muted'
=======
                          ${
                            isActive(item.path)
                              ? "bg-muted font-bold text-primary"
                              : "text-muted-foreground hover:bg-muted"
>>>>>>> origin/pancjoao
                          }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
<<<<<<< HEAD
=======

                  {/* Botão login/logout no mobile */}
                  {!loading && (
                    user ? (
                      <Button
                        onClick={handleLogout}
                        className="w-full bg-red-600 hover:bg-red-700 text-white"
                      >
                        Deslogar
                      </Button>
                    ) : (
                      <SheetClose asChild>
                        <Link
                          href="/login"
                          className={`block w-full text-left px-4 py-3 rounded-lg text-lg transition
                            ${
                              isActive("/login")
                                ? "bg-muted font-bold text-primary"
                                : "text-muted-foreground hover:bg-muted"
                            }`}
                        >
                          Entrar
                        </Link>
                      </SheetClose>
                    )
                  )}
>>>>>>> origin/pancjoao
                </div>
              </SheetContent>
            </Sheet>
          </div>
<<<<<<< HEAD

        </div>
      </div>
    </nav>
  );
}

export default Nav;
=======
        </div>
      </div>
    </nav>
  )
}
>>>>>>> origin/pancjoao
