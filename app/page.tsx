"use client";

import { useState } from "react";
import { ProjectCard } from "./shared";

export default function IndexPage() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const projects = [
    {
      id: "pec3",
      title: "PEC 3 - Selección y rediseño de una mala práctica",
      description:
        "Análisis crítico y propuesta de mejora de visualizaciones de datos existentes, aplicando principios de diseño efectivo.",
      status: "EN PROGRESO" as const,
      href: "/pec3",
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
          />
        </svg>
      ),
      color: "from-blue-500 to-purple-600",
    },
    {
      id: "pec4",
      title: "PEC 4 - Elementos de interactividad",
      description:
        "Explorador interactivo de datos de emisiones de CO₂ con visualizaciones dinámicas, filtros avanzados y análisis temporal.",
      status: "COMPLETADO" as const,
      href: "/pec4",
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
          />
        </svg>
      ),
      color: "from-green-500 to-teal-600",
    },
    {
      id: "practica",
      title: "Práctica (parte 2) - Diseño de una visualización interactiva",
      description:
        "Desarrollo completo de una solución de visualización interactiva aplicando metodologías de diseño centrado en el usuario.",
      status: "EN PROGRESO" as const,
      href: "/practica",
      icon: (
        <svg
          className='w-8 h-8'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M13 10V3L4 14h7v7l9-11h-7z'
          />
        </svg>
      ),
      color: "from-purple-500 to-pink-600",
    },
  ];

  return (
    <main className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='container mx-auto px-4 py-6'>
          <div className='text-center'>
            <h1 className='text-4xl font-bold text-gray-900 mb-2'>
              Infografía y Visualización
            </h1>
            <p className='text-xl text-gray-600 mb-1'>
              Universitat Oberta de Catalunya (UOC)
            </p>
            <p className='text-sm text-gray-500'>
              Portfolio de entregas y prácticas del curso
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 py-12'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl font-bold text-gray-800 mb-4'>
            Entregas del Curso
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Selecciona una de las entregas para explorar los trabajos realizados
            en el curso de Infografía y Visualización de Datos.
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto'>
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              status={project.status}
              href={project.href}
              icon={project.icon}
              color={project.color}
              isClickable={project.status === "COMPLETADO"}
              onHover={setHoveredCard}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className='mt-16 text-center'>
          <div className='bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto'>
            <h3 className='text-lg font-semibold text-gray-800 mb-2'>
              Estado del Portfolio
            </h3>
            <div className='flex justify-center space-x-6 text-sm'>
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-green-500 rounded-full mr-2'></div>
                <span className='text-gray-600'>1 Completado</span>
              </div>
              <div className='flex items-center'>
                <div className='w-3 h-3 bg-yellow-500 rounded-full mr-2'></div>
                <span className='text-gray-600'>2 En Progreso</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
