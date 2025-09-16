import { Code, Server, Database, Cloud } from "lucide-react";
import { useSimplePixiDetection } from "../../hooks/dom/useSimplePixiDetection";
import { useSpacebarInteraction } from "../../hooks/keyboard/useSpacebarInteraction";
import { SkillModal } from "../common/SkillModal";
import { useRef, useState } from "react";

export const Skills = () => {
    // Referencias para los elementos detectables
    const frontendSkillRef = useRef<HTMLDivElement>(null);
    const backendSkillRef = useRef<HTMLDivElement>(null);

    // Estado para el modal
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        skillType: 'frontend' | 'backend' | null;
    }>({
        isOpen: false,
        skillType: null
    });

    const skills = [
        { name: "Frontend Development", icon: <Code className="w-8 h-8 lg:w-10 lg:h-10" />, ref: frontendSkillRef },
        { name: "Backend Development", icon: <Server className="w-8 h-8 lg:w-10 lg:h-10" />, ref: backendSkillRef },
        { name: "Databases & SQL", icon: <Database className="w-8 h-8 lg:w-10 lg:h-10" /> },
        { name: "Cloud & Deployment", icon: <Cloud className="w-8 h-8 lg:w-10 lg:h-10" /> },
    ];

    const { isCharacterOver: isOverFrontend } = useSimplePixiDetection({
        elementRef: frontendSkillRef,
        collisionTolerance: 30
    });

    const { isCharacterOver: isOverBackend } = useSimplePixiDetection({
        elementRef: backendSkillRef,
        collisionTolerance: 30
    });

    // Manejadores de interacción
    const handleFrontendInteraction = () => {
        setModalState({ isOpen: true, skillType: 'frontend' });
    };

    const handleBackendInteraction = () => {
        setModalState({ isOpen: true, skillType: 'backend' });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, skillType: null });
    };

    // Hooks de interacción con barra espaciadora
    useSpacebarInteraction({
        isActive: isOverFrontend,
        onInteraction: handleFrontendInteraction
    });

    useSpacebarInteraction({
        isActive: isOverBackend,
        onInteraction: handleBackendInteraction
    });

    return (
        <section className="relative z-10 w-full px-6 lg:px-8 py-24">
            <div className="max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-6 backdrop-blur-sm border border-emerald-200/50 dark:border-emerald-800/50">
                        <span className="text-lg">⚡</span>
                        Expertise
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-8 leading-tight">
                        Habilidades{' '}
                        <span className="bg-gradient-title">técnicas</span>
                    </h2>
                    
                    <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                        Especializado en tecnologías modernas para crear soluciones completas y escalables
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            ref={skill.ref}
                            className={`group relative transition-all duration-300 ${
                                (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                    ? 'transform scale-105'
                                    : 'hover:transform hover:scale-105'
                            }`}
                        >
                            {/* Interactive Indicator */}
                            {((index === 0 && isOverFrontend) || (index === 1 && isOverBackend)) && (
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
                                    <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap shadow-xl backdrop-blur-sm">
                                        <div className="flex items-center gap-2">
                                            <kbd className="bg-emerald-600 text-white px-2 py-1 rounded text-xs font-mono">
                                                ESPACIO
                                            </kbd>
                                            <span>para explorar</span>
                                        </div>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900 dark:border-t-slate-100"></div>
                                    </div>
                                </div>
                            )}

                            {/* Skill Card */}
                            <div className={`card-modern p-8 h-full transition-all duration-300 group-hover:shadow-2xl ${
                                (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                    ? 'ring-2 ring-emerald-500 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-950/50 dark:to-blue-950/50'
                                    : ''
                            }`}>
                                {/* Icon Container */}
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                                    (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                        ? 'bg-gradient-to-r from-emerald-500 to-blue-500 text-white scale-110'
                                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-gradient-to-r group-hover:from-emerald-500 group-hover:to-blue-500 group-hover:text-white'
                                }`}>
                                    {skill.icon}
                                </div>

                                {/* Content */}
                                <h3 className={`text-xl font-semibold mb-3 transition-colors duration-300 ${
                                    (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                        ? 'text-emerald-700 dark:text-emerald-400'
                                        : 'text-slate-900 dark:text-slate-100'
                                }`}>
                                    {skill.name}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                    {index === 0 && "Interfaces modernas y experiencias de usuario excepcionales"}
                                    {index === 1 && "APIs robustas y arquitecturas escalables"}
                                    {index === 2 && "Gestión eficiente de datos y consultas optimizadas"}
                                    {index === 3 && "Despliegue y infraestructura en la nube"}
                                </p>

                                {/* Progress indicator */}
                                <div className="mt-6">
                                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-500 mb-2">
                                        <span>Experiencia</span>
                                        <span>{index < 2 ? 'Avanzado' : 'Intermedio'}</span>
                                    </div>
                                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5">
                                        <div 
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                                    ? 'bg-gradient-to-r from-emerald-500 to-blue-500'
                                                    : 'bg-slate-400 dark:bg-slate-500'
                                            }`}
                                            style={{ width: index < 2 ? '85%' : '70%' }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Call to Action */}
                <div className="text-center">
                    <div className="card-modern p-6 max-w-md mx-auto">
                        <div className="flex items-center gap-3 justify-center mb-4">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-emerald-700 dark:text-emerald-400 font-medium">Pro tip</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-400 text-sm">
                            Mueve tu personaje sobre las tarjetas de <strong>Frontend</strong> y <strong>Backend</strong> para acceder a información detallada
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal de Skills */}
            {modalState.skillType && (
                <SkillModal
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    skillType={modalState.skillType}
                />
            )}
        </section>
    );
};
