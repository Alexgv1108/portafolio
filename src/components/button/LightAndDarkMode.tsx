import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../hooks/stores/useThemeStore";

export const LightAndDarkMode = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const isDark = isDarkMode();

    return (
        <button
            onClick={toggleTheme}
            className={`
        fixed top-4 right-4 z-50
        p-4 rounded-full flex items-center justify-center
        bg-white/90 dark:bg-slate-800/90
        text-slate-800 dark:text-cyan-400
        border-2 border-slate-200/50 dark:border-slate-600/50
        shadow-lg dark:shadow-xl backdrop-blur-sm
        hover:bg-cyan-50 dark:hover:bg-slate-700
        hover:border-cyan-300 dark:hover:border-cyan-500
        hover:shadow-2xl hover:shadow-cyan-200/50 dark:hover:shadow-cyan-500/25
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        group overflow-hidden hover:cursor-pointer
      `}
        >
            {/* Efecto de brillo al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-200 to-blue-200 dark:from-cyan-400 dark:to-blue-400 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full" />

            {isDark ? (
                <Sun className="w-7 h-7 transform group-hover:rotate-180 transition-transform duration-300" />
            ) : (
                <Moon className="w-7 h-7 transform group-hover:-rotate-12 transition-transform duration-300" />
            )}
        </button>
    );
};
