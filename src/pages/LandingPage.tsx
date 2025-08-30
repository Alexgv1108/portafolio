export const LandingPage = () => {
    return (
        <section className="relative w-full h-screen flex items-start justify-center overflow-hidden pt-10">

            {/* Contenedor central para el contenido */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                {/* Título elegante */}
                <h1 className="text-gray-900 text-5xl md:text-6xl font-extrabold drop-shadow-md">
                    Bienvenido a <span className="text-yellow-500">Mi portafolio</span>
                </h1>

                {/* Subtítulo profesional */}
                <p className="mt-4 text-gray-700 text-lg md:text-xl max-w-2xl drop-shadow-sm">
                    Este va a ser un texto donde explico alguna cosa necesaria sobre mi portafolio.
                </p>
            </div>
        </section>
    )
}