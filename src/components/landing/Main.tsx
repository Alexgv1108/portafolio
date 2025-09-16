
export const Main = () => {
    return (
        <section className="relative z-10 w-full px-6 lg:px-8">
            {/* Hero Section */}
            <div className="max-w-5xl mx-auto pt-16 pb-8">
                {/* Título Principal con mayor impacto */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                        Disponible para proyectos
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-slate-100 mb-6 leading-tight">
                        Hola, soy{' '}
                        <span className="bg-gradient-title block lg:inline">
                            Alex Gallego
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
                        Desarrollador Full Stack especializado en crear{' '}
                        <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            experiencias digitales excepcionales
                        </span>{' '}
                        con tecnologías modernas
                    </p>
                </div>

                {/* CTA Section */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                    <button className="button-primary px-8 py-4 rounded-xl font-semibold text-lg">
                        Ver mis proyectos
                    </button>
                    <button className="px-8 py-4 rounded-xl font-semibold text-lg border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:border-emerald-500 dark:hover:border-emerald-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all duration-300">
                        Descargar CV
                    </button>
                </div>

                {/* Interactive Guide */}
                <div className="card-modern p-6 max-w-lg mx-auto">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                            <span className="text-2xl">🎮</span>
                        </div>
                        <div>
                            <h3 className="text-primary font-semibold text-lg mb-2">
                                Explora de forma interactiva
                            </h3>
                            <p className="text-secondary text-sm leading-relaxed mb-4">
                                Usa las teclas{' '}
                                <span className="inline-flex items-center gap-1 mx-1">
                                    {['W', 'A', 'S', 'D'].map((key) => (
                                        <kbd 
                                            key={key}
                                            className="px-2 py-1 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-md text-slate-700 dark:text-slate-300 shadow-sm"
                                        >
                                            {key}
                                        </kbd>
                                    ))}
                                </span>{' '}
                                para mover tu personaje y descubrir elementos interactivos
                            </p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-500">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                                También disponible en dispositivos móviles
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};