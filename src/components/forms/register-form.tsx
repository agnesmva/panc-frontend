"use client"
<<<<<<< HEAD

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner' // Para notificações
import { Loader2 } from 'lucide-react'

// 1. Importa o Schema e o Tipo que acabamos de criar
import { PlantRegisterSchema, TPlantRegisterSchema } from '@/hooks/validator'

// 2. Importa os componentes do Shadcn
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea' // Para a Descrição

/**
 * Componente do Formulário de Cadastro de Plantas
 */
export function PlantRegisterForm() {
  const [isLoading, setIsLoading] = useState(false)

  // 3. Configura o React Hook Form
  const form = useForm<TPlantRegisterSchema>({
    resolver: zodResolver(PlantRegisterSchema),
    defaultValues: {
      nomePlanta: "",
      nomeCientifico: "",
      descricao: "",
      localizacao: "",
      fotoPlanta: undefined, // O 'register' cuidará disso
    },
  })

  // 4. Precisamos registrar o campo de 'file' manualmente
  //    para que o Zod consiga validá-lo.
  const fileRef = form.register("fotoPlanta")

  // 5. Função de Envio (onSubmit)
  async function onSubmit(values: TPlantRegisterSchema) {
    setIsLoading(true)
    console.log("Iniciando envio...")

    // --- Simulação de envio ---
    // Em um app real, você enviaria 'values' para sua API
    // Para enviar o arquivo, você usaria 'new FormData()'
    
    // Mostra os dados no console (inclusive o nome do arquivo)
    console.log({
      nome: values.nomePlanta,
      cientifico: values.nomeCientifico,
      descricao: values.descricao,
      localizacao: values.localizacao,
      nomeArquivo: values.fotoPlanta[0].name,
      tamanhoArquivo: values.fotoPlanta[0].size,
    })
    
    // Simula uma espera da rede
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    toast.success("Planta cadastrada com sucesso!", {
      description: `${values.nomePlanta} foi adicionada ao catálogo.`,
    })
    form.reset() // Limpa o formulário após o sucesso
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Nome da Planta */}
        <FormField
          control={form.control}
          name="nomePlanta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Planta *</FormLabel>
              <FormControl>
                <Input placeholder="Ora-pro-nóbis" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nome Científico */}
        <FormField
          control={form.control}
          name="nomeCientifico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome Científico</FormLabel>
              <FormControl>
                <Input placeholder="Pereskia aculeata" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Descrição */}
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva a planta, seu uso, características..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Máximo de 500 caracteres.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Localização */}
        <FormField
          control={form.control}
          name="localizacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Localização *</FormLabel>
              <FormControl>
                <Input placeholder="Canteiro A-03" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Foto da Planta (Campo de Arquivo) */}
        <FormItem>
          <FormLabel>Foto da Planta *</FormLabel>
          <FormControl>
            {/* 6. Usamos o 'fileRef' do 'register' aqui */}
            <Input 
              type="file" 
              accept="image/*" 
              {...fileRef}
              className="file:text-primary file:font-medium"
            />
          </FormControl>
          <FormDescription>
            PNG, JPG ou WEBP. Máximo de 5MB.
          </FormDescription>
          {/* 7. Mostra o erro do Zod para o campo de arquivo */}
          {form.formState.errors.fotoPlanta && (
            <p className="text-sm font-medium text-destructive">
              {form.formState.errors.fotoPlanta.message}
            </p>
          )}
        </FormItem>


        {/* Botão de Envio */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Cadastrando...
            </>
          ) : (
            "Cadastrar Planta"
          )}
        </Button>
      </form>
    </Form>
  )
}
=======
import { useState } from "react"
import { auth } from "@/lib/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"

export function RegisterForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createUserWithEmailAndPassword(auth, email, password)
      alert("Cadastro realizado com sucesso!")
      window.location.href = "/home"
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <input
        type="email"
        placeholder="Email"
        className="border p-2 rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        className="border p-2 rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="bg-primary text-white p-2 rounded">
        Cadastrar
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
}
>>>>>>> origin/pancjoao
