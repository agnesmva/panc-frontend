'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'

export default function DeslogarPage() {
  const router = useRouter()

  useEffect(() => {
    async function doSignOut() {
      try {
        await signOut(auth)
      } finally {
        router.replace('/login')
      }
    }
    doSignOut()
  }, [router])

  return <div>Deslogando...</div>
}