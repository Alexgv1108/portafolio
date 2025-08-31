export const Background = () => {
    return (
        <div className="w-full h-screen fixed top-0 left-0 pointer-events-none">
            <div className="absolute inset-0 overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-500">
                {/* Formas para Light Mode */}
                <div className="absolute top-0 left-1/4 w-96 h-96 
                                bg-yellow-200 dark:bg-yellow-600 
                                rounded-full mix-blend-multiply filter blur-3xl 
                                opacity-30 dark:opacity-20 animate-blob">
                </div>
                <div className="absolute bottom-0 right-1/4 w-80 h-80 
                                bg-yellow-300 dark:bg-yellow-500 
                                rounded-full mix-blend-multiply filter blur-2xl 
                                opacity-20 dark:opacity-15 animate-blob animation-delay-2000">
                </div>
                <div className="absolute top-1/3 right-1/3 w-72 h-72 
                                bg-yellow-100 dark:bg-yellow-400 
                                rounded-full mix-blend-multiply filter blur-2xl 
                                opacity-25 dark:opacity-10 animate-blob animation-delay-4000">
                </div>
            </div>
        </div>
    );
};