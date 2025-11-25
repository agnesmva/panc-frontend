import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  BookOpen,
  LayoutDashboard,
  Thermometer,
  Power,
  BarChart3,
  ListTodo,
} from 'lucide-react'
import { redirect } from 'next/navigation'

/**
 * Página Inicial (Home)
 * Fornece uma visão geral do projeto e links para as seções principais.
 */
export default function HomePage() {
  redirect('/login')
}