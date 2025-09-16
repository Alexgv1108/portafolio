export const AboutMe = () => {

    return (
        <section className="relative z-10 w-full px-4 lg:px-8 xl:px-12 py-20 pt-80 pb-10">
            <div className="max-w-7xl mx-auto">
                {/* Título */}
                <h2 className={`text-4xl md:text-5xl xl:text-6xl font-extrabold mb-8 lg:mb-12 drop-shadow-md text-center transition-all duration-300 text-slate-800 dark:text-slate-100`}>
                    About <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 bg-clip-text text-transparent">Me</span>
                </h2>

                {/* Descripción */}
                <p className="text-slate-700 dark:text-slate-300 text-lg md:text-xl xl:text-2xl max-w-4xl mb-16 lg:mb-20 drop-shadow-sm mx-auto text-center leading-relaxed">
                    Soy desarrollador apasionado por construir aplicaciones modernas y eficientes. Me encanta trabajar tanto en el frontend como en el backend, optimizando bases de datos, 
                    creando APIs y desplegando proyectos en la nube. Disfruto aprender nuevas tecnologías y siempre busco soluciones limpias y elegantes.
                </p>
            </div>
        </section>
    );
};
