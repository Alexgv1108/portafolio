export const AboutMe = () => {

    return (
        <section className="relative z-10 w-full px-6 lg:px-8 py-24 pt-32">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100/80 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-400 text-sm font-medium mb-6 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50">
                        <span className="text-lg">👨‍💻</span>
                        Sobre mí
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-8 leading-tight">
                        Construyendo el{' '}
                        <span className="bg-gradient-title">futuro digital</span>
                    </h2>
                </div>

                {/* Content Grid */}
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content */}
                    <div className="space-y-6">
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                            Soy un desarrollador full stack apasionado por crear{' '}
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                                soluciones tecnológicas innovadoras
                            </span>{' '}
                            que marquen la diferencia.
                        </p>
                        
                        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                            Mi enfoque se centra en la combinación perfecta entre{' '}
                            <span className="text-blue-600 dark:text-blue-400 font-medium">diseño elegante</span>,{' '}
                            <span className="text-emerald-600 dark:text-emerald-400 font-medium">código limpio</span> y{' '}
                            <span className="text-indigo-600 dark:text-indigo-400 font-medium">experiencias excepcionales</span>.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">3+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Años de experiencia</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">20+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Proyectos completados</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">10+</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Tecnologías dominadas</div>
                            </div>
                        </div>
                    </div>

                    {/* Visual Element */}
                    <div className="relative">
                        <div className="card-modern p-8 text-center">
                            <div className="w-24 h-24 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl mx-auto mb-6 flex items-center justify-center text-4xl">
                                🚀
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                                Siempre en evolución
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-6">
                                Manteniéndome al día con las últimas tecnologías y mejores prácticas del desarrollo web.
                            </p>
                            
                            {/* Technologies Icons */}
                            <div className="flex justify-center items-center gap-4 opacity-60">
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute -top-4 -left-4 w-8 h-8 bg-emerald-400 rounded-full opacity-20"></div>
                        <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-blue-400 rounded-full opacity-20"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
