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

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import { TeamSwitcher } from "@/components/sidebar/team-switcher";
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
import { NavData } from "./nav-data";

// Sample data
const data = {
    user: {
        name: "Shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
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
            <SidebarHeader>{/* <TeamSwitcher teams={data.teams} /> */}</SidebarHeader>
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
            <SidebarFooter>
                <NavUser user={data.user} signOut={signOut} handleLogout={handleLogout} />
            </SidebarFooter>
        </Sidebar>
    );
}

export default DashboardSidebar;
