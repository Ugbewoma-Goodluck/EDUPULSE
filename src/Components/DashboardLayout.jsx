// src/Components/DashboardLayout.jsx
import { Outlet, Link } from "react-router-dom";
import Admin from "./Admin";
import "./DashboardLayout.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/ChatGPT Image Jul 10, 2025, 05_16_19 AM.png";
import { Icon } from "@iconify/react";
import { signOut } from "firebase/auth";
import "./Admin.css";
import { auth } from "../firebase";
import { useState } from "react";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [open, setopen] = useState(false);
  const handlemenu = () => {
    setopen(!open);
  };
  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      signOut(auth)
        .then(() => {
          toast.success("Logged out successfully");
          // Optional: redirect or cleanup
          navigate("/login");
        })
        .catch((error) => {
          toast.error("Logout failed");
          console.error(error);
        });
    }
    // Do nothing if user clicks cancel
  };

  return (
    <div>
      <div className="navigation">
        <img src={logo} alt="Logo" className="logo" />
        <button onClick={handlemenu} className="btn-icon">
          {open ? (
            <Icon
              icon="mdi:close"
              width="24"
              height="24"
              className="hamburger-close"
              onClick={handlemenu}
            />
          ) : (
            <Icon
              icon="material-symbols:menu-rounded"
              className="hamburger"
              onClick={handlemenu}
            />
          )}
        </button>
      </div>
      <aside className={`sidebar ${open ? "open" : ""}`} onClick={handlemenu}>
        <h2>Admin Panel</h2>
        <nav onClick={handlemenu} className="sidebar-list">
          <Link to="admin" className="link">
            Admin
          </Link>
          <Link to="feedback" className="link">
            Feedback
          </Link>
          <button onClick={handleLogout} className="Dashboard-logout">
            Logout
          </button>
        </nav>
      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
