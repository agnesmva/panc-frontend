<<<<<<< HEAD
import { PlantRegisterForm } from "@/components/forms/register-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// 1. Importa o componente da tabela que já criamos
import TableDashboard from "@/components/dashboard/table"
import Construcao from "@/components/construction/construction"

{/**
 * Página de Gerenciamento de Plantas
 * (Renderiza o formulário e a tabela)
 */}
export default function RegisterPlantPage() {
  return (
     <div>
          <div className="flex items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <main className="flex flex-col min-h-screen py-32 px-16 bg-white dark:bg-black sm:items-start">
            <Construcao />
          </main>
        </div>
    </div>
  )
}
=======
import Nav from "@/components/nav/nav";
import Footer from "@/components/footer/footer";
import DashboardPage from "@/components/plant/plant-exb";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* topo / nav */}
      <Nav />

      {/* conteúdo principal ocupa todo o espaço disponível */}
      <main className="flex-1">
        <DashboardPage />
      </main>

      {/* footer colado no fim da tela */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
>>>>>>> origin/pancjoao
