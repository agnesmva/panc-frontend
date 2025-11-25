"use client"
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
