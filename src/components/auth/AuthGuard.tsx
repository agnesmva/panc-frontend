'use client'
import React, { useEffect, useState, PropsWithChildren } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function AuthGuard({ children }: PropsWithChildren) {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  // rotas públicas que não exigem autenticação
  const publicPaths = ['/login', '/register', '/deslogar']

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setLoading(false)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    if (!loading) {
      const isPublic = publicPaths.some((p) => pathname?.startsWith(p))
      if (!isPublic && !user) {
        // usuário não autenticado tenta acessar rota protegida → manda para /login
        router.replace('/login')
      }
    }
  }, [loading, user, pathname, router])

  // durante verificação evitar flash de conteúdo — enquanto carrega, renderiza null (ou loader)
  if (loading) return null

  // se rota pública ou usuário autenticado, renderiza children
  return <>{children}</>
}