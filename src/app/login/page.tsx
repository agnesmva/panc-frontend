import { MoveLeft } from "lucide-react"
<<<<<<< HEAD

import { LoginForm } from "@/components/forms/login-form"
=======
import LoginForm from "@/components/forms/login-form"
>>>>>>> origin/pancjoao
import Footer from "@/components/footer/footer"

export default function LoginPage() {
  return (
<<<<<<< HEAD
    <>
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/home" className="flex items-center gap-2 font-medium">
            <div className="text-primary flex size-8 items-center justify-center rounded-md">
              <MoveLeft className="size-6" />
            </div>
            Voltar
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
      </div>
    </div>
    </>
    
=======
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
>>>>>>> origin/pancjoao
  )
}
