import { useEffect } from "react";
import { useThemeStore } from "../stores/useThemeStore";

export const useToggleTheme = () => {
    const { theme, isDarkMode } = useThemeStore();

    useEffect(() => {
        const root = document.documentElement;
        const isDark = isDarkMode();

        if (root.classList.contains("dark") !== isDark) {
            root.classList.toggle("dark", isDark);
        }
        localStorage.setItem("theme", theme);
    }, [isDarkMode, theme]);
}