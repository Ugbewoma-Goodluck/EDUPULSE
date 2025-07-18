import "./assets/styles/index.css"
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ShadcnThemeContext.jsx";
import App from "./App";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <ThemeProvider attribute="data-theme" defaultTheme="inline" enableSystem>
            <App />
        </ThemeProvider>
    </StrictMode>,
);
