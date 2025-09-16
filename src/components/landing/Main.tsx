
export const Main = () => {
    return (
        <section className="relative z-10 w-full px-4">
            {/* Bloque Título */}
            <div className="block mb-12 text-center pt-10">
                <h1 className="text-slate-800 dark:text-slate-100 text-5xl md:text-6xl font-extrabold drop-shadow-md mb-4">
                    Llegaste a <span className="bg-gradient-title">Mi portafolio</span>
                </h1>
            </div>

            {/* Bloque Subtítulo */}
            <div className="block text-center max-w-2xl mx-auto mb-8">
                <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl drop-shadow-sm">
                    Hola, soy Alex, un desarrollador Web full stack que le encanta la programación.
                </p>
            </div>

            {/* Información adicional */}
            <div className="block text-center">
                <div className="bg-gradient-to-r from-cyan-50/80 via-blue-50/80 to-violet-50/80 dark:from-slate-800/90 dark:via-slate-800/90 dark:to-slate-700/90 rounded-2xl p-6 
                    max-w-md mx-auto border border-cyan-200/50 dark:border-slate-600/50 shadow-lg backdrop-blur-sm">
                    <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                        Usa las teclas{' '}
                        <span className="inline-flex items-center gap-1 mx-1">
                            {['W', 'A', 'S', 'D'].map((key) => (
                                <kbd 
                                    key={key}
                                    className="px-2 py-1 text-xs font-bold bg-white/90 dark:bg-slate-800/90 border border-slate-300/50 
                                    dark:border-slate-500/50 rounded-md shadow-sm text-slate-800 dark:text-cyan-300 
                                    ring-1 ring-cyan-500/20 dark:ring-cyan-400/30"
                                >
                                    {key}
                                </kbd>
                            ))}
                        </span>{' '}
                        para mover el personaje por la página y descubrir elementos interactivos
                    </p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-3 italic">
                        ¡También funciona en dispositivos móviles con los controles táctiles!
                    </p>
                </div>
            </div>
        </section>
    );
};