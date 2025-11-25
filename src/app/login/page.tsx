import { MoveLeft } from "lucide-react"
import LoginForm from "@/components/forms/login-form"
import Footer from "@/components/footer/footer"

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* topo */}
      <div className="flex justify-start p-6">
        <a href="/home" className="flex items-center gap-2 font-medium">
          <div className="text-primary flex size-8 items-center justify-center rounded-md">
            <MoveLeft className="size-6" />
          </div>
          Voltar
        </a>
      </div>

      {/* conteúdo principal */}
      <main className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-xs flex flex-col gap-6">
          {/* título acima do formulário */}
          <h1 className="text-4xl font-bold text-center uppercase tracking-wide text-black whitespace-nowrap">
            Login
          </h1>

          <LoginForm />

          <a
            href="/register"
            className="bg-secondary text-white text-center p-2 rounded hover:bg-secondary/80 transition"
          >
            Criar conta
          </a>
        </div>
      </main>

    </div>
  )
}
