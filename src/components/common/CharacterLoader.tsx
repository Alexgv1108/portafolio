import { useCharacterStore } from '../../hooks/stores/useCharacterStore';
import { useShallow } from 'zustand/shallow';

export const CharacterLoader = () => {
    const { assetsLoaded } = useCharacterStore(
        useShallow((state) => ({
            assetsLoaded: state.assetsLoaded,
        }))
    );

    if (assetsLoaded) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-sm">
            <div className="flex flex-col items-center space-y-6">
                {/* Spinner principal */}
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-slate-700 rounded-full animate-spin border-t-emerald-500"></div>
                    <div className="absolute inset-2 w-16 h-16 border-4 border-slate-700 rounded-full animate-spin border-t-blue-500 animate-reverse"></div>
                </div>

                {/* Texto de carga */}
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Cargando personaje...
                    </h3>
                    <p className="text-slate-400 text-sm">
                        Preparando la experiencia interactiva
                    </p>
                </div>

                {/* Indicador de progreso animado */}
                <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden relative">
                    <div className="absolute inset-0 h-full bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full animate-pulse-progress"></div>
                </div>

                {/* Iconos flotantes */}
                <div className="flex space-x-4">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            </div>
        </div>
    );
};
