import type { Theme } from "../enums/Theme";

export interface ThemeState {
    theme: Theme;
    toggleTheme: () => void;
    isDarkMode: () => boolean;
}