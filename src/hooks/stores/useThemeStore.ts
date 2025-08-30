import { create } from "zustand";
import type { ThemeState } from "../../models/interfaces/ThemeState";
import { createJSONStorage, persist } from "zustand/middleware";
import { Theme } from "../../models/enums/Theme";

export const useThemeStore = create<ThemeState>()(
    persist(
        (set, get) => ({
            theme: Theme.light,
            toggleTheme: () => set((state) => ({ theme: state.theme === Theme.light ? Theme.dark : Theme.light })),
            isDarkMode: () => get().theme === Theme.dark,
        }),
        {
            name: "theme-storage",
            storage: createJSONStorage(() => localStorage),
            partialize: ({ theme }) => ({ theme }),
        }
    )
);