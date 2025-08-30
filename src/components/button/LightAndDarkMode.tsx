import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../hooks/stores/useThemeStore';

export const LightAndDarkMode = () => {
    const { isDarkMode, toggleTheme } = useThemeStore();

    const isDark = isDarkMode();

    return (
        <button
            onClick={toggleTheme}
            className={`
                relative p-3 rounded-full cursor-pointer flex items-center justify-center
                bg-white dark:bg-gray-800 text-gray-800 dark:text-yellow-400
                shadow-lg dark:shadow-xl transition-all duration-300 ease-in-out
                border-2 border-gray-200 dark:border-gray-600
                hover:bg-yellow-50 dark:hover:bg-gray-700
                hover:border-yellow-300 dark:hover:border-yellow-500
                hover:shadow-2xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-500/25
                transform hover:scale-110 active:scale-95
                group overflow-hidden
            `}
        >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-orange-200 dark:from-yellow-400 dark:to-orange-400 opacity-0 hover:opacity-20 transition-opacity duration-300 rounded-full" />
            
            {isDark
                ? <Sun className="w-6 h-6 transform group-hover:rotate-180 transition-transform duration-300" />
                : <Moon className="w-6 h-6 transform group-hover:-rotate-12 transition-transform duration-300" />
            }
        </button>
    );
}
