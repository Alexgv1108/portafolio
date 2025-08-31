import { Github, ExternalLink, Mail } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-inner py-8 px-4 mt-20">
            <div className="max-w-7xl mx-auto text-center">
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    &copy; {new Date().getFullYear()} Mi Portafolio. Todos los derechos reservados.
                </p>
                <div className="flex justify-center items-center gap-6">
                    <a
                        href="https://github.com/tuusuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform transform hover:scale-110"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                    <a
                        href="https://linkedin.com/in/tuusuario"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform transform hover:scale-110"
                        aria-label="LinkedIn Profile"
                    >
                        <ExternalLink className="w-6 h-6" />
                    </a>
                    <a
                        href="mailto:tuemail@correo.com"
                        className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-transform transform hover:scale-110"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </footer>
    );
};
