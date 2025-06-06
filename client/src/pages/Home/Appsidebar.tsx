import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";

const items = [
  { title: "Web Development", url: "/web-development", icon: () => <span>💻</span> },
  { title: "Data Science", url: "/data-science", icon: () => <span>📊</span> },
  { title: "Machine Learning", url: "/machine-learning", icon: () => <span>🤖</span> },
  { title: "Mobile Development", url: "/mobile-development", icon: () => <span>📱</span> },
  { title: "Game Development", url: "/game-development", icon: () => <span>🎮</span> },
];

const AppSidebar = () => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Choose Your Field</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton onClick={() => navigate(item.url)}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
