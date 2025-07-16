// src/pages/404.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function NotFound404() {
    return (
        <div style={styles.container}>
            <h1 style={styles.code}>404</h1>
            <p style={styles.message}>Oops—this page doesn’t exist.</p>
            <Link to="/" style={styles.link}>
                ← Go back home
            </Link>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
    },
    code: {
        fontSize: "6rem",
        margin: 0,
    },
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
