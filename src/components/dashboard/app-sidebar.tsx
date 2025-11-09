import { UserStar, User, Flower, Power, Search, Settings, CircleGauge, CirclePlus} from "lucide-react"
 
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./profile-user"
 
// Menu items.
const home = [
  {
    title: "Dashboard",
    url: "#",
    icon: CircleGauge,
  },
  {
    title: "Plantas",
    url: "#",
    icon: Flower,
  },
  {
    title: "Ligar Irrigação",
    url: "#",
    icon: Power,
  },
  {
    title: "Busca",
    url: "#",
    icon: Search,
  },
  {
    title: "Configurações",
    url: "#",
    icon: Settings,
  },
]

const administrativo = [
  {
    title: "Cadastros",
    url: "#",
    icon: CirclePlus,
  },
  {
    title: "Usuários",
    url: "#",
    icon: User,
  },
  {
    title: "Gestão",
    url: "#",
    icon: UserStar,
  },
]
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Atalhos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {home.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Administrativo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {administrativo.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      <NavUser />
    </Sidebar>
  )
}