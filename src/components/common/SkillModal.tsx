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
            description: "Creando interfaces excepcionales que combinan diseño moderno con funcionalidad intuitiva",
            technologies: [
                { name: "React", level: "Experto", color: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800", progress: 95 },
                { name: "TypeScript", level: "Avanzado", color: "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800", progress: 90 },
                { name: "Tailwind CSS", level: "Experto", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800", progress: 95 },
                { name: "Next.js", level: "Avanzado", color: "bg-slate-50 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700", progress: 85 },
                { name: "Vite", level: "Avanzado", color: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border border-purple-200 dark:border-purple-800", progress: 88 },
                { name: "Framer Motion", level: "Intermedio", color: "bg-pink-50 text-pink-700 dark:bg-pink-950/50 dark:text-pink-400 border border-pink-200 dark:border-pink-800", progress: 75 }
            ],
            gradient: "from-emerald-500 via-blue-500 to-indigo-600",
            bgGradient: "from-emerald-50 via-blue-50 to-indigo-50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-indigo-950/30"
        },
        backend: {
            title: "Backend Development",
            emoji: "🏗️",
            icon: <Server className="w-8 h-8" />,
            description: "Desarrollando arquitecturas sólidas y APIs escalables que impulsan aplicaciones robustas",
            technologies: [
                { name: "Node.js", level: "Avanzado", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800", progress: 88 },
                { name: "Express", level: "Avanzado", color: "bg-slate-50 text-slate-700 dark:bg-slate-800/50 dark:text-slate-400 border border-slate-200 dark:border-slate-700", progress: 90 },
                { name: "PostgreSQL", level: "Avanzado", color: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border border-blue-200 dark:border-blue-800", progress: 85 },
                { name: "MongoDB", level: "Intermedio", color: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800", progress: 78 },
                { name: "Docker", level: "Intermedio", color: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950/50 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800", progress: 75 },
                { name: "AWS", level: "Básico", color: "bg-orange-50 text-orange-700 dark:bg-orange-950/50 dark:text-orange-400 border border-orange-200 dark:border-orange-800", progress: 65 }
            ],
            gradient: "from-emerald-500 via-blue-500 to-cyan-600",
            bgGradient: "from-emerald-50 via-blue-50 to-cyan-50 dark:from-emerald-950/30 dark:via-blue-950/30 dark:to-cyan-950/30"
        }
    };

    const data = skillData[skillType];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Enhanced Backdrop */}
            <div 
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl transition-opacity duration-300"
                onClick={onClose}
            />
            
            {/* Modal Content */}
            <div className={`relative max-w-3xl w-full mx-4 bg-gradient-to-br ${data.bgGradient} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 animate-in zoom-in-95 fade-in-0 border border-white/20 dark:border-slate-800/50`}>
                {/* Header con gradiente mejorado */}
                <div className={`relative px-8 py-8 bg-gradient-to-r ${data.gradient} text-white overflow-hidden`}>
                    {/* Elementos decorativos mejorados */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
                    
                    {/* Close button mejorado */}
                    <button
                        onClick={onClose}
                        className="absolute top-6 right-6 p-3 rounded-xl bg-white/20 hover:bg-white/30 transition-all duration-200 backdrop-blur-sm border border-white/20 hover:scale-110"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>

                    {/* Header content mejorado */}
                    <div className="relative flex items-start gap-6">
                        <div className="flex-shrink-0 p-4 bg-white/20 rounded-2xl backdrop-blur-sm border border-white/30">
                            <div className="text-white">
                                {data.icon}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <h2 className="text-3xl font-bold">
                                    {data.title}
                                </h2>
                                <span className="text-3xl">{data.emoji}</span>
                            </div>
                            <p className="text-white/90 text-lg leading-relaxed font-light">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm">
                    {/* Technologies Section */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                                Tecnologías y Herramientas
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {data.technologies.map((tech) => (
                                <div
                                    key={tech.name}
                                    className={`group relative p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-lg ${tech.color}`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <h4 className="font-semibold text-lg mb-1">
                                                {tech.name}
                                            </h4>
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-current fill-current" />
                                                <span className="text-sm font-medium">
                                                    {tech.level}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-xl font-bold opacity-50">
                                            {tech.progress}%
                                        </div>
                                    </div>
                                    
                                    {/* Progress bar */}
                                    <div className="w-full bg-white/50 dark:bg-slate-800/50 rounded-full h-2 mb-2">
                                        <div 
                                            className="h-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${tech.progress}%` }}
                                        ></div>
                                    </div>
                                    
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute top-2 right-2">
                                        <Sparkles className="w-4 h-4 text-current animate-pulse" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section mejorada */}
                    <div className="text-center bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
                        <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer group" onClick={onClose}>
                            <span>¡Excelente!</span>
                            <Sparkles className="w-6 h-6 group-hover:animate-spin" />
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm mt-4 flex items-center justify-center gap-2">
                            <span>Presiona</span>
                            <kbd className="px-3 py-1 bg-slate-200 dark:bg-slate-700 rounded-lg text-xs font-mono border border-slate-300 dark:border-slate-600">ESC</kbd>
                            <span>para cerrar</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
