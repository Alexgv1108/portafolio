export const NotFound = () => {
    return (
        <section className="relative w-full h-screen flex items-start justify-center overflow-hidden pt-20">

            {/* Contenedor central para el contenido */}
            <div className="relative z-10 flex flex-col items-center text-center px-4">
                {/* Título elegante */}
                <h1 className="text-slate-800 dark:text-slate-100 text-5xl md:text-6xl font-extrabold drop-shadow-md">
                    <span className="bg-gradient-title">404 - Página no encontrada</span>
                </h1>

                {/* Subtítulo profesional */}
                <p className="mt-4 text-slate-700 dark:text-slate-300 text-lg md:text-xl max-w-2xl drop-shadow-sm">
                    Este enlace no existe. Por favor, verifica la URL o regresa a la página principal.
                </p>
            </div>
        </section>
    )
}