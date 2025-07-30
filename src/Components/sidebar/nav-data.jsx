import { useLocation, NavLink } from "react-router-dom";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

export function NavData({ data }) {
    const { isMobile } = useSidebar();
    const { pathname } = useLocation();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Data</SidebarGroupLabel>
            <SidebarMenu>
                {data.map((item) => {
                    const active = pathname === item.url;
                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild isActive={active}>
                                <NavLink to={item.url}>
                                    <item.icon
                                        style={{ fill: active ? "currentColor" : undefined }}
                                    />
                                    <span>{item.name}</span>
                                </NavLink>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
