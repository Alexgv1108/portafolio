import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useRef } from "react";
import { useFastPixiDetection } from '../../hooks/dom/useFastPixiDetection';

export const Footer = () => {
    const footerRef = useRef<HTMLDivElement>(null);
    const { isCharacterOver } = useFastPixiDetection({
        elementRef: footerRef,
        textoIndicador: 'Contacto disponible',
        collisionTolerance: 50
    });

    return (
        <footer
            ref={footerRef}
            className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-grid-pattern bg-grid-emerald-500/20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-16">
                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Contacto
                        </h3>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex items-center space-x-3 group">
                                <Mail className="w-5 h-5 text-emerald-400 group-hover:text-blue-400 transition-colors" />
                                <span className="group-hover:text-white transition-colors">
                                    ale.garcia.herrera.1998@gmail.com
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <Phone className="w-5 h-5 text-emerald-400 group-hover:text-blue-400 transition-colors" />
                                <span className="group-hover:text-white transition-colors">
                                    +56 9 1234 5678
                                </span>
                            </div>
                            <div className="flex items-center space-x-3 group">
                                <MapPin className="w-5 h-5 text-emerald-400 group-hover:text-blue-400 transition-colors" />
                                <span className="group-hover:text-white transition-colors">
                                    Santiago, Chile
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Enlaces
                        </h3>
                        <div className="space-y-3">
                            {['Sobre Mí', 'Habilidades', 'Proyectos', 'Contacto'].map((link) => (
                                <a
                                    key={link}
                                    href={`#${link.toLowerCase().replace(' ', '-')}`}
                                    className="block text-slate-300 hover:text-emerald-400 transition-colors duration-300 hover:translate-x-2 transform"
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                            Sígueme
                        </h3>
                        <div className="flex space-x-4">
                            <a
                                href="https://github.com/alexgarciaherrera"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:scale-110"
                            >
                                <Github className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                            </a>
                            <a
                                href="https://linkedin.com/in/alex-garcia-herrera"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group p-3 rounded-xl bg-white/10 hover:bg-blue-500/20 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-110"
                            >
                                <Linkedin className="w-6 h-6 text-slate-400 group-hover:text-blue-400 transition-colors" />
                            </a>
                            <a
                                href="mailto:ale.garcia.herrera.1998@gmail.com"
                                className="group p-3 rounded-xl bg-white/10 hover:bg-emerald-500/20 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:scale-110"
                            >
                                <Mail className="w-6 h-6 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Brand */}
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">A</span>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Alexander Gallego
                            </span>
                        </div>

                        {/* Copyright */}
                        <div className="text-slate-400 text-sm text-center md:text-right">
                            <p>© 2024 Alexander Gallego. Todos los derechos reservados.</p>
                            <p className="mt-1">Desarrollado con ❤️ usando React + TypeScript + PIXI.js</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Character Detection Effect */}
            {isCharacterOver && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="px-4 py-2 bg-emerald-500/90 text-white rounded-lg shadow-lg backdrop-blur-sm animate-bounce">
                        ¡Contacto disponible! Presiona ESPACIO
                    </div>
                </div>
            )}

            {/* Glow Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
        </footer>
    );
};
