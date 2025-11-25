"use client"

import React from "react"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "@/components/auth/AuthProvider"

import {
  Avatar,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NavUser() {
  const router = useRouter()
  const { user } = useAuth()   // pega usuário logado do contexto

  const handleLogout = async () => {
    await signOut(auth)        // encerra sessão no Firebase
    router.push("/login")      // redireciona para login
  }

  const handleConfig = () => {
    window.alert("Página ainda não criada.")
  }

  return (
    <div className="border-t border-gray-700 p-4">
      <div className="flex items-center justify-between">
        
        {/* Avatar e Informações do Usuário */}
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage 
              src="https://placehold.co/40x40/black/white?text=A" 
              alt="Avatar do usuário" 
            />
          </Avatar>
          <div className="flex flex-col text-sm">
            <span className="font-medium text-[#b6ca59]">
              {user?.displayName || "Usuário"}
            </span>
            <span className="text-gray-400">
              {user?.email || "Não logado"}
            </span>
          </div>
        </div>

        {/* Menu Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem onClick={handleConfig}>Configurações</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
