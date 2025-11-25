"use client"
import React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/AuthProvider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function MenuBar() {
  const router = useRouter()
  const { user, loading } = useAuth()

  async function handleLogout() {
    await signOut(auth)
    router.replace("/login")
  }

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Conta</MenubarTrigger>
        <MenubarContent>
          {loading ? (
            <MenubarItem disabled>Carregando...</MenubarItem>
          ) : user ? (
            <MenubarItem>
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white w-full">
                Deslogar
              </Button>
            </MenubarItem>
          ) : (
            <MenubarItem>
              <Link href="/login">Entrar</Link>
            </MenubarItem>
          )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
