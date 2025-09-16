import { Moon, Sun } from "lucide-react";
import { useThemeStore } from "../../hooks/stores/useThemeStore";

export const LightAndDarkMode = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();
    const isDark = isDarkMode();

    return (
        <button
            onClick={toggleTheme}
            className={`
        fixed top-6 right-6 z-50
        p-4 rounded-2xl flex items-center justify-center
        bg-white/90 dark:bg-slate-800/90
        text-slate-700 dark:text-emerald-400
        border border-slate-200/50 dark:border-slate-700/50
        shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 backdrop-blur-xl
        hover:bg-emerald-50 dark:hover:bg-slate-700
        hover:border-emerald-300 dark:hover:border-emerald-500
        hover:shadow-xl hover:shadow-emerald-200/50 dark:hover:shadow-emerald-500/25
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        group overflow-hidden hover:cursor-pointer
      `}
        >
            {/* Efecto de brillo mejorado */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            {isDark ? (
                <Sun className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-300 relative z-10" />
            ) : (
                <Moon className="w-6 h-6 transform group-hover:-rotate-12 transition-transform duration-300 relative z-10" />
            )}
        </button>
    );
};
