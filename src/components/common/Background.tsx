export const Background = () => {
    return (
        <div className="w-full h-screen fixed top-0 left-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500">
                {/* Elementos de fondo más sutiles y profesionales */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 
                                bg-gradient-to-r from-emerald-200/30 to-blue-200/30 dark:from-emerald-600/20 dark:to-blue-600/20 
                                rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl 
                                opacity-40 dark:opacity-30 animate-blob">
                </div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 
                                bg-gradient-to-r from-blue-200/40 to-indigo-200/40 dark:from-blue-500/25 dark:to-indigo-500/25 
                                rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl 
                                opacity-30 dark:opacity-25 animate-blob animation-delay-2000">
                </div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 
                                bg-gradient-to-r from-emerald-100/50 to-cyan-100/50 dark:from-emerald-400/15 dark:to-cyan-400/15 
                                rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-2xl 
                                opacity-35 dark:opacity-20 animate-blob animation-delay-4000">
                </div>
                
                {/* Patrón de puntos sutil */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10"
                     style={{
                         backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(51, 65, 85) 1px, transparent 0)',
                         backgroundSize: '40px 40px'
                     }}>
                </div>
                
                {/* Gradiente superior para mejor legibilidad */}
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-white/50 to-transparent dark:from-slate-950/50"></div>
            </div>
        </div>
    );
};