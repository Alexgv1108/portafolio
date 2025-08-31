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
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-yellow-400
        border-2 border-gray-200 dark:border-gray-600
        shadow-lg dark:shadow-xl
        hover:bg-yellow-50 dark:hover:bg-gray-700
        hover:border-yellow-300 dark:hover:border-yellow-500
        hover:shadow-2xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-500/25
        transition-all duration-300 ease-in-out
        transform hover:scale-110 active:scale-95
        group overflow-hidden hover:cursor-pointer
      `}
        >
            {/* Efecto de brillo al hacer hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-400 dark:to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full" />

            {isDark ? (
                <Sun className="w-7 h-7 transform group-hover:rotate-180 transition-transform duration-300" />
            ) : (
                <Moon className="w-7 h-7 transform group-hover:-rotate-12 transition-transform duration-300" />
            )}
        </button>
    );
};
