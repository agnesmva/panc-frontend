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
