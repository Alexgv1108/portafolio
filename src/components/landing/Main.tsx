

export const Main = () => {
    return (
        <section className="relative z-10 w-full px-4">
            {/* Bloque Título */}
            <div className="block mb-12 text-center">
                <h1 className="text-gray-900 dark:text-white text-5xl md:text-6xl font-extrabold drop-shadow-md mb-4">
                    Bienvenido a <span className="bg-gradient-title">Mi portafolio</span>
                </h1>
            </div>

            {/* Bloque Subtítulo */}
            <div className="block text-center max-w-2xl mx-auto mb-8">
                <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl drop-shadow-sm">
                    Este va a ser un texto donde explico alguna cosa necesaria sobre mi portafolio.
                    Aquí puedo contar un poco sobre mi experiencia, las tecnologías que uso y mi enfoque
                    en desarrollo de software moderno y limpio.
                </p>
            </div>

            {/* Información adicional */}
            <div className="block text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-4">
                    Usa las teclas WASD para mover el personaje por la página y descubrir elementos interactivos
                </p>
            </div>
        </section>
    );
};
