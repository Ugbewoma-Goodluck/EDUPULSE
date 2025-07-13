// src/context/ThemeContext.jsx
import React, { createContext } from "react";
import { useTheme } from "../hooks/useTheme.jsx";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
	const [isDark, toggleTheme] = useTheme();
	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}
