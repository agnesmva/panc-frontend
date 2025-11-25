"use client" // Gráficos Recharts e hooks (useState/useEffect) exigem Client Components

// 1. Importa useState e useEffect
import React, { useState, useEffect } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { Droplet, Thermometer, CloudDrizzle, Sun } from "lucide-react"

// --- DADOS DE EXEMPLO (MOCK DATA) ---

// (Os dados dos Stat Cards permanecem os mesmos)
const MOCK_STATS_DATA = [
  {
    id: "humidity",
    title: "Umidade do solo",
    value: "58%",
    description: "+3% desde ontem",
    icon: <Droplet className="h-5 w-5 text-blue-500" />,
  },
  {
    id: "temperature",
    title: "Temperatura",
    value: "24°C",
    description: "Ideal",
    icon: <Thermometer className="h-5 w-5 text-red-500" />,
  },
  {
    id: "irrigation",
    title: "Volume de irrigação",
    value: "1.2L",
    description: "Últimas 24h",
    icon: <CloudDrizzle className="h-5 w-5 text-cyan-500" />,
  },
  {
    id: "sunlight",
    title: "Luz solar (UV)",
    value: "Alto (7)",
    description: "Média de 6h/dia",
    icon: <Sun className="h-5 w-5 text-yellow-500" />,
  },
]

// 2. Renomeamos para 'INITIAL_CHART_DATA'
// Estes são os dados que o gráfico terá no *primeiro* carregamento
const INITIAL_CHART_DATA = [
  { time: "00:00", humidity: 55 },
  { time: "03:00", humidity: 56 },
  { time: "06:00", humidity: 58 },
  { time: "09:00", humidity: 62 },
  { time: "12:00", humidity: 60 },
  { time: "15:00", humidity: 57 },
  { time: "18:00", humidity: 55 },
  { time: "21:00", humidity: 54 },
  { time: "24:00", humidity: 55 },
]

// (Configuração do gráfico permanece a mesma)
const chartConfig = {
  humidity: {
    label: "Umidade",
    color: "#2563eb", // azul
  },
} satisfies ChartConfig

// (Componente StatCard permanece o mesmo)
function StatCard({ title, value, description, icon }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}


/**
 * Componente Principal: PlantOverview
 * Mostra um panorama geral dos dados da planta.
 */
function PlantOverview() {

  // 3. CRIA O ESTADO para os dados do gráfico
  // Inicializamos o estado com os dados estáticos
  const [chartData, setChartData] = useState(INITIAL_CHART_DATA)

  // 4. CRIA O 'useEffect' PARA ATUALIZAR OS DADOS
  useEffect(() => {
    
    // Inicia um intervalo (timer) que rodará a cada 5 segundos
    const intervalId = setInterval(() => {
      
      // A função 'fetchAndUpdateData' simula a busca de novos dados
      // Em um app real, você faria um fetch() para sua API aqui
      
      // 'setChartData' nos dá o estado anterior ('prevData')
      setChartData((prevData) => {
        // 1. Remove o ponto de dado mais antigo (o primeiro item do array)
        const newData = prevData.slice(1) 
        
        // 2. Pega o último ponto de dado para basear o novo valor
        const lastPoint = prevData[prevData.length - 1]
        
        // 3. Simula um novo valor de umidade (ex: +/- 2)
        //    (Garante que o valor fique entre 40 e 70 para ser realista)
        const newHumidity = Math.max(
          40, 
          Math.min(70, lastPoint.humidity + (Math.random() - 0.5) * 4)
        );

        // 4. Pega a hora atual para o eixo X
        const newTime = new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        
        // 5. Adiciona o novo ponto de dado no final do array
        newData.push({
          time: newTime,
          humidity: Math.floor(newHumidity * 10) / 10 // Arredonda para 1 decimal
        })
        
        // 6. Retorna o novo array de dados para atualizar o estado
        return newData
      })
      
    }, 5000) // 5000ms = 5 segundos

    // 5. FUNÇÃO DE LIMPEZA
    // Isso é CRUCIAL: para o intervalo quando o componente "morrer"
    // (ex: quando o usuário sair da página), evitando vazamentos de memória.
    return () => clearInterval(intervalId)

  }, []) // O array vazio [] garante que este 'useEffect' rode apenas uma vez (no "mount")


  return (
    <div className="space-y-6">
      
      {/* 1. Grid de Cartões de Estatística (sem mudanças) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {MOCK_STATS_DATA.map((stat) => (
          <StatCard
            key={stat.id}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* 2. Gráfico de Histórico */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Umidade (Tempo Real)</CardTitle>
          <CardDescription>
            Acompanhe a variação da umidade do solo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[250px] w-full">
            {/* 6. O GRÁFICO AGORA USA O ESTADO 'chartData' */}
            <LineChart
              data={chartData}
              margin={{
                left: -20,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                fontSize={12}
                tickFormatter={(value) => `${value.toFixed(0)}%`} // Arredonda o eixo Y
                domain={['dataMin - 5', 'dataMax + 5']} // Domínio dinâmico
              />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="humidity"
                type="monotone"
                stroke="var(--color-humidity)" // Usa a cor do chartConfig
                strokeWidth={3}
                dot={true}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

    </div>
  )
}

export default PlantOverview