
export const Main = () => {
    return (
        <section className="relative z-10 w-full px-4">
            {/* Bloque Título */}
            <div className="block mb-12 text-center pt-10">
                <h1 className="text-gray-900 dark:text-white text-5xl md:text-6xl font-extrabold drop-shadow-md mb-4">
                    Llegaste a <span className="bg-gradient-title">Mi portafolio</span>
                </h1>
            </div>

            {/* Bloque Subtítulo */}
            <div className="block text-center max-w-2xl mx-auto mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl drop-shadow-sm">
                    Hola, soy Alex, un desarrollador Web full stack que le encanta la programación.
                </p>
            </div>

            {/* Información adicional */}
            <div className="block text-center">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg p-3 
                    max-w-md mx-auto border border-blue-200 dark:border-gray-600 shadow-sm">
                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                        Usa las teclas{' '}
                        <span className="inline-flex items-center gap-1 mx-1">
                            {['W', 'A', 'S', 'D'].map((key) => (
                                <kbd 
                                    key={key}
                                    className="px-2 py-1 text-xs font-bold bg-white dark:bg-gray-800 border border-gray-300 
                                    dark:border-gray-500 rounded shadow-sm text-gray-800 dark:text-yellow-300"
                                >
                                    {key}
                                </kbd>
                            ))}
                        </span>{' '}
                        para mover el personaje por la página y descubrir elementos interactivos
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 italic">
                        ¡También funciona en dispositivos móviles con los controles táctiles!
                    </p>
                </div>
            </div>
        </section>
    );
};