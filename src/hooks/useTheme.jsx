// src/hooks/useTheme.js
import { useEffect, useState } from "react";

export function useTheme(defaultDark = true) {
	const [isDark, setIsDark] = useState(() => {
		// this runs *once*, before the first render
		const raw = localStorage.getItem("currentTheme");
		if (raw === "true" || raw === "false") {
			return raw === "true"; // use the saved value
		}
		return defaultDark; // fallback
	});

	// persist any changes
	useEffect(() => {
		localStorage.setItem("currentTheme", JSON.stringify(isDark));
	}, [isDark]);

	const toggle = () => setIsDark((d) => !d);
	return [isDark, toggle];
}
