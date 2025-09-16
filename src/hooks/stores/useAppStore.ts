import { create } from "zustand";
import type { AppStore } from "../../models/screen/interfaces/AppStore";

export const useAppStore = create<AppStore>()((set) => ({
    appZ: null,
    container: null,
    isReady: false,
    setAppZ: (app) => set(() => ({ appZ: app })),
    appAddChildToContainer: (idleTexture) => set((state) => {
        if (state.appZ) {
            state.appZ.stage.addChild(idleTexture);
        }
        return state;
    }),
    setContainer: (container) => set(() => ({ container })),
    appendChildToContainer: (child) => set((state) => {
        if (state.container) {
            state.container.appendChild(child);
        }
        return state;
    }),
    setIsReady: (isReady) => set(() => ({ isReady })),
    destroyApp: () => set((state) => {
        if (state.appZ) {
            if (state.appZ.canvas?.parentNode) {
                state.appZ.canvas.parentNode.removeChild(state.appZ.canvas);
            }
            state.appZ.destroy();
        }
        return { appZ: null, isReady: false };
    })
}));