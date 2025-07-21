import * as React from "react";
import { Link } from "react-router-dom";
import {
    BookOpen,
    Bot,
    MessageSquare,
    Palette,
    PieChart,
    ChartArea,
    Settings2,
    SquareTerminal,
    LayoutDashboard,
} from "lucide-react";

import { NavData } from "@/components/sidebar/nav-data";
import { NavUser } from "@/components/sidebar/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from "@/components/ui/sidebar";

import ThemeDropdown from "@/components/ThemeDropdown";

// Sample data
const data = {
    user: {
        name: "Edupulse",
        email: "edupulse360@gmail.com",
        avatar: "/avatars/shadcn.jpg",
    },
    data: [
        {
            name: "All Feedbacks",
            url: "/dashboard/feedback",
            icon: MessageSquare,
        },
        {
            name: "Charts",
            url: "/dashboard/charts",
            icon: PieChart,
        },
    ],
};

export function DashboardSidebar({ signOut, handleLogout, ...rest }) {
    const { isMobile } = useSidebar();

    return (
        <Sidebar {...rest}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/dashboard">
                                        <LayoutDashboard style={{ fill: "currentColor" }} />
                                        <span>Dashboard</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <NavData data={data.data} />
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton className="hover:bg-inherit" asChild>
                                    <span className="relative">
                                        <Palette />
                                        <span>Change Theme</span>

                                        <ThemeDropdown
                                            dropdownSide={isMobile ? "bottom" : "right"}
                                            dropdownAlign={isMobile ? "end" : "start"}
                                            className="absolute right-0 aspect-square h-full group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:opacity-0"
                                        />
                                    </span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="z-1000">
                <NavUser user={data.user} signOut={signOut} handleLogout={handleLogout} />
            </SidebarFooter>
        </Sidebar>
    );
}

export default DashboardSidebar;
