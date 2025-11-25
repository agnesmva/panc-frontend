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
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
                src="https://res.cloudinary.com/dwkzysoyd/image/upload/v1763055410/b362cc_57e359e57ad241fea682c3df2c2384b0_mv2_edm8pe.png"
                alt="Logo"
              />
            </Link>
          </div>

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
              >
                {item.label}
              </Link>
            ))}

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
                  {baseNavItems.map((item) => (
                    <SheetClose asChild key={item.path}>
                      <Link
                        href={item.path}
                        className={`block w-full text-left px-4 py-3 rounded-lg text-lg transition
                          ${
                            isActive(item.path)
                              ? "bg-muted font-bold text-primary"
                              : "text-muted-foreground hover:bg-muted"
                          }`}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}

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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
