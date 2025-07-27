// src/pages/404.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {
    return (
        <main className="flex h-[100vh] flex-col items-center justify-center text-center">
            <span className="text-muted-foreground m-0 text-[96px]">404</span>
            <p className="text-oreground m-[0.5rem_0_1.5rem] text-[1.5rem]">
                Oops—this page doesn’t exist.
            </p>
            <Link to="/" className="text-[1rem] text-[#2563eb] no-underline">
                ← Go back home
            </Link>
        </main>
    );
}

const styles = {
    message: {
        fontSize: "1.5rem",
        margin: "0.5rem 0 1.5rem",
    },
    link: {
        color: "#2563eb",
        textDecoration: "none",
        fontSize: "1rem",
    },
};
