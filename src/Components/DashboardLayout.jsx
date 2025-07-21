import { Outlet, Link, useNavigate } from "react-router-dom";
import "./Admin.css";
import "./DashboardLayout.css";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

import { toast } from "sonner";
import { DashboardSidebar } from "@/components/sidebar/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
                <DashboardSidebar
                    className="sidebar z-1000"
                    collapsible="icon"
                    variant="sidebar"
                    signOut={signOut}
                    handleLogout={handleLogout}
                />
                <section className="body">
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
