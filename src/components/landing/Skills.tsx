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
        <section className="relative z-10 w-full px-4 lg:px-8 xl:px-12 py-20 pt-10">
            <div className="max-w-7xl mx-auto">
                {/* Título de Skills */}
                <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold mb-8 lg:mb-12 drop-shadow-md text-center transition-all duration-300 text-gray-900 dark:text-white">
                    My <span className="text-yellow-500 dark:text-yellow-400">Skills</span>
                </h2>

                {/* Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 xl:gap-10 max-w-6xl mx-auto">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            ref={skill.ref}
                            className={`relative flex flex-col items-center justify-center p-8 lg:p-10 rounded-2xl shadow-lg dark:shadow-2xl backdrop-blur-sm transform transition-all duration-300 ${
                                (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                    ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/50 dark:to-yellow-800/50 shadow-2xl border-2 border-yellow-500 dark:border-yellow-400'
                                    : 'bg-white/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-700/50'
                            }`}
                            style={{
                                minHeight: '200px',
                                backdropFilter: 'blur(10px)'
                            }}
                        >
                            {/* Indicador de interacción */}
                            {((index === 0 && isOverFrontend) || (index === 1 && isOverBackend)) && (
                                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap shadow-lg">
                                        <span className="flex items-center gap-1">
                                            <kbd className="bg-gray-700 dark:bg-gray-300 text-white dark:text-gray-900 px-1 py-0.5 rounded text-xs font-mono">
                                                ESPACIO
                                            </kbd>
                                            para interactuar
                                        </span>
                                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                                    </div>
                                </div>
                            )}
                            <div className={`mb-6 p-4 rounded-full transition-all duration-300 ${
                                (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                    ? 'bg-yellow-200 dark:bg-yellow-700/50'
                                    : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                                <div className={`transition-colors duration-300 ${
                                    (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                        ? 'text-yellow-600 dark:text-yellow-300'
                                        : ''
                                }`}>
                                    {skill.icon}
                                </div>
                            </div>
                            <span className={`font-semibold text-center text-lg lg:text-xl transition-colors duration-300 ${
                                (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                    ? 'text-yellow-700 dark:text-yellow-300'
                                    : 'text-gray-900 dark:text-white'
                            }`}>
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Instrucciones para el usuario */}
                <div className="mt-20 lg:mt-24 text-center">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-700/50">
                        <span className="text-2xl">💡</span>
                        <p className="text-gray-700 dark:text-gray-300 text-sm lg:text-base">
                            <strong className="text-blue-700 dark:text-blue-300">Tip:</strong> Mueve tu personaje con las teclas WASD por encima de los elementos para activar indicadores especiales
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
