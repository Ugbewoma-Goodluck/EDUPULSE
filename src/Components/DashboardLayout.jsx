// src/components/DashboardLayout.jsx
import { useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Admin from "./Admin";
import "./Admin.css";
import "./DashboardLayout.css";
import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import { toast } from "sonner";
import { DashboardSidebar } from "@/components/sidebar/DashboardSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/header/DashboardHeader";
import DashboardFooter from "@/components/footer/DashboardFooter";

const DashboardLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (!confirmLogout) return;

        toast
            .promise(signOut(auth), {
                loading: "Signing you out...",
                success: "You’ve successfully logged out.",
                error: "Logout failed. Give it another go.",
            })
            .then(() => {
                navigate("/login");
            })
            .catch((error) => {
                console.error(error); // still log it for debugging
            });
    };

    return (
        <SidebarProvider>
            <div className="dashboard-layout">
                {/* <h2>Admin Panel</h2>
                    <nav onClick={handleMenu} className="sidebar-list">
                        <Link to="admin" className="link">
                            Admin
                        </Link>
                        <Link to="feedback" className="link">
                            Feedback
                        </Link>
                        <button onClick={handleLogout} className="Dashboard-logout">
                            Logout
                        </button>
                    </nav> */}
                <DashboardSidebar
                    className="sidebar z-1000"
                    collapsible="icon"
                    variant="sidebar"
                    signOut={signOut}
                    handleLogout={handleLogout}
                />
                <section className="body">
                    {/* <header className="header">
                        <img src={logo} alt="Logo" className="logo" />
                        <button onClick={handleMenu} className="btn-icon">
                            {open ? (
                                <Icon
                                    icon="mdi:close"
                                    width="24"
                                    height="24"
                                    className="hamburger-close"
                                    onClick={handleMenu}
                                />
                            ) : (
                                <Icon
                                    icon="material-symbols:menu-rounded"
                                    className="hamburger"
                                    onClick={handleMenu}
                                />
                            )}
                        </button>
                    </header> */}
                    <DashboardHeader />
                    <main className="content">
                        <Outlet />
                    </main>
                    <DashboardFooter />
                </section>
            </div>
        </SidebarProvider>
    );
};

export default DashboardLayout;
