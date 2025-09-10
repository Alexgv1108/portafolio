import { Code, Server, Database, Cloud } from "lucide-react";
import { useSimplePixiDetection } from "../../hooks/dom/useSimplePixiDetection";
import { useRef } from "react";

export const AboutMe = () => {
    // Referencias para los elementos detectables
    const titleRef = useRef<HTMLHeadingElement>(null);
    const frontendSkillRef = useRef<HTMLDivElement>(null);
    const backendSkillRef = useRef<HTMLDivElement>(null);

    const skills = [
        { name: "Frontend Development", icon: <Code className="w-6 h-6 text-yellow-500" />, ref: frontendSkillRef },
        { name: "Backend Development", icon: <Server className="w-6 h-6 text-yellow-500" />, ref: backendSkillRef },
        { name: "Databases & SQL", icon: <Database className="w-6 h-6 text-yellow-500" /> },
        { name: "Cloud & Deployment", icon: <Cloud className="w-6 h-6 text-yellow-500" /> },
    ];

    // Hooks simplificados para detección
    const { isCharacterOver: isOverTitle } = useSimplePixiDetection({
        elementRef: titleRef,
        collisionTolerance: 50
    });

    const { isCharacterOver: isOverFrontend } = useSimplePixiDetection({
        elementRef: frontendSkillRef,
        collisionTolerance: 30
    });

    const { isCharacterOver: isOverBackend } = useSimplePixiDetection({
        elementRef: backendSkillRef,
        collisionTolerance: 30
    });

    return (
        <section className="relative z-10 w-full px-4 py-20 pt-80">
            {/* Título */}
            <h2 
                ref={titleRef}
                className={`text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-md text-center transition-all duration-300 ${
                    isOverTitle 
                        ? 'text-yellow-500 dark:text-yellow-400 scale-105' 
                        : 'text-gray-900 dark:text-white'
                }`}
                style={{
                    textShadow: isOverTitle ? '0 0 20px rgba(245, 158, 11, 0.5)' : 'none'
                }}
            >
                About <span className="text-yellow-500">Me</span>
            </h2>

            {/* Descripción */}
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-3xl mb-12 drop-shadow-sm mx-auto text-center">
                Soy desarrollador apasionado por construir aplicaciones modernas y eficientes. Me encanta trabajar tanto en el frontend como en el backend, optimizando bases de datos, creando APIs y desplegando proyectos en la nube. Disfruto aprender nuevas tecnologías y siempre busco soluciones limpias y elegantes.
            </p>

            {/* Skills */}
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8 max-w-5xl mx-auto">
                {skills.map((skill, index) => (
                    <div
                        key={skill.name}
                        ref={skill.ref}
                        className={`flex flex-col items-center p-6 w-full md:w-[45%] rounded-xl shadow-lg dark:shadow-xl transform transition-all duration-300 ${
                            (index === 0 && isOverFrontend) || (index === 1 && isOverBackend)
                                ? 'bg-yellow-100 dark:bg-yellow-900 scale-110 shadow-2xl border-2 border-yellow-500'
                                : 'bg-white dark:bg-gray-800 hover:scale-105'
                        }`}
                    >
                        <div className="mb-4">{skill.icon}</div>
                        <span className={`font-semibold transition-colors duration-300 ${
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
            <div className="mt-16 text-center">
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                    💡 <strong>Tip:</strong> Mueve tu personaje con las teclas WASD por encima de los elementos para activar indicadores especiales
                </p>
            </div>
        </section>
    );
};
