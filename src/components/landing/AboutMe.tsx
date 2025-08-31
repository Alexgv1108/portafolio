import { Code, Server, Database, Cloud } from "lucide-react";

export const AboutMe = () => {
    const skills = [
        { name: "Frontend Development", icon: <Code className="w-6 h-6 text-yellow-500" /> },
        { name: "Backend Development", icon: <Server className="w-6 h-6 text-yellow-500" /> },
        { name: "Databases & SQL", icon: <Database className="w-6 h-6 text-yellow-500" /> },
        { name: "Cloud & Deployment", icon: <Cloud className="w-6 h-6 text-yellow-500" /> },
    ];

    return (
        <section className="relative z-10 w-full px-4 py-20 pt-80">
            {/* Título */}
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 drop-shadow-md text-center">
                About <span className="text-yellow-500">Me</span>
            </h2>

            {/* Descripción */}
            <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl max-w-3xl mb-12 drop-shadow-sm mx-auto text-center">
                Soy desarrollador apasionado por construir aplicaciones modernas y eficientes. Me encanta trabajar tanto en el frontend como en el backend, optimizando bases de datos, creando APIs y desplegando proyectos en la nube. Disfruto aprender nuevas tecnologías y siempre busco soluciones limpias y elegantes.
            </p>

            {/* Skills */}
            <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-8 max-w-5xl mx-auto">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="flex flex-col items-center p-6 w-full md:w-[45%] bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-xl hover:scale-105 transform transition-all duration-300"
                    >
                        <div className="mb-4">{skill.icon}</div>
                        <span className="text-gray-900 dark:text-white font-semibold">{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
