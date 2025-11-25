"use client"
import { useState } from "react"
import { auth } from "@/lib/firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      alert("Login realizado com sucesso!")
      window.location.href = "/home"
    } catch (err: any) {
      // traduzindo mensagens comuns do Firebase para algo mais amigável
      if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado. Verifique o email informado.")
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta. Tente novamente.")
      } else if (err.code === "auth/invalid-email") {
        setError("Formato de email inválido.")
      } else {
        setError("Não foi possível realizar o login. Tente novamente.")
      }
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
        Entrar
      </button>

      {/* mensagem de erro amigável */}
      {error && (
        <p className="text-red-600 text-sm font-medium text-center">
          {error}
        </p>
      )}
    </form>
  )
}
