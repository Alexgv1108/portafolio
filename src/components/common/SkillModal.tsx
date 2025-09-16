import { X, Code, Server, Star, Sparkles } from "lucide-react";
import { useEffect } from "react";

interface SkillModalProps {
    isOpen: boolean;
    onClose: () => void;
    skillType: 'frontend' | 'backend';
}

export function SkillModal({ isOpen, onClose, skillType }: SkillModalProps) {
    // Cerrar modal con Escape y manejar body scroll
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const skillData = {
        frontend: {
            title: "Frontend Development",
            emoji: "🎨",
            icon: <Code className="w-8 h-8" />,
            description: "Especializado en crear interfaces de usuario modernas, interactivas y accesibles que brindan experiencias excepcionales",
            technologies: [
                { name: "React", level: "Avanzado", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
                { name: "TypeScript", level: "Avanzado", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
                { name: "Tailwind CSS", level: "Experto", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
                { name: "Next.js", level: "Intermedio", color: "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300" },
                { name: "Vite", level: "Avanzado", color: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300" },
                { name: "CSS Modules", level: "Avanzado", color: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300" }
            ],
            gradient: "from-cyan-500 to-blue-600",
            bgGradient: "from-cyan-50 to-blue-50 dark:from-cyan-950/50 dark:to-blue-950/50"
        },
        backend: {
            title: "Backend Development",
            emoji: "🏗️",
            icon: <Server className="w-8 h-8" />,
            description: "Construyendo arquitecturas robustas, APIs escalables y sistemas distribuidos con las mejores prácticas de desarrollo",
            technologies: [
                { name: "Node.js", level: "Avanzado", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
                { name: "Express", level: "Avanzado", color: "bg-slate-100 text-slate-700 dark:bg-slate-700/30 dark:text-slate-300" },
                { name: "PostgreSQL", level: "Avanzado", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300" },
                { name: "MongoDB", level: "Intermedio", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300" },
                { name: "Docker", level: "Intermedio", color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300" },
                { name: "AWS", level: "Básico", color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300" }
            ],
            gradient: "from-emerald-500 to-cyan-600",
            bgGradient: "from-emerald-50 to-cyan-50 dark:from-emerald-950/50 dark:to-cyan-950/50"
        }
    };

    const data = skillData[skillType];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop con blur y animación */}
            <div 
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className={`relative max-w-2xl w-full mx-4 bg-gradient-to-br ${data.bgGradient} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-in zoom-in-95 fade-in-0`}>
                {/* Header con gradiente */}
                <div className={`relative px-8 py-6 bg-gradient-to-r ${data.gradient} text-white overflow-hidden`}>
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
                    
                    {/* Close button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Header content */}
                    <div className="relative flex items-center gap-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                            <div className="text-white">
                                {data.icon}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <h2 className="text-3xl font-bold">
                                    {data.title}
                                </h2>
                                <span className="text-2xl">{data.emoji}</span>
                            </div>
                            <p className="text-white/90 text-lg leading-relaxed">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm">
                    {/* Technologies Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-2 mb-6">
                            <Sparkles className="w-6 h-6 text-cyan-500" />
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Tecnologías Principales
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {data.technologies.map((tech) => (
                                <div
                                    key={tech.name}
                                    className={`group relative p-4 rounded-2xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 ${tech.color} hover:scale-105`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">
                                                {tech.name}
                                            </h4>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                <span className="text-sm opacity-80">
                                                    {tech.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <Sparkles className="w-5 h-5 text-current" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="text-center">
                        <div className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-2xl font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group" onClick={onClose}>
                            <span>¡Genial!</span>
                            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
                            Presiona <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded text-xs font-mono">ESC</kbd> para cerrar
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
