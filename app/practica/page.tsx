"use client";

import { BackButton } from "../shared";

export default function PracticaPage() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50'>
      {/* Back to Index Button */}
      <div className='absolute top-8 left-8 z-10'>
        <BackButton href='/' color='purple' />
      </div>

      {/* Main Content */}
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='text-center max-w-2xl'>
          {/* Badge */}
          <div className='mb-6'>
            <span className='bg-purple-100 text-purple-800 text-sm font-medium px-4 py-2 rounded-full'>
              Práctica (Parte 2)
            </span>
          </div>

          {/* Icon */}
          <div className='mb-8'>
            <div className='w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg'>
              <svg
                className='w-12 h-12 text-white'
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
            </div>
          </div>

          {/* Title and Description */}
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Diseño de una visualización interactiva
          </h1>

          <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
            Desarrollo completo de una solución de visualización interactiva
            aplicando metodologías de diseño centrado en el usuario y técnicas
            avanzadas de interacción.
          </p>

          {/* Coming Soon Card */}
          <div className='bg-white rounded-2xl shadow-xl p-8 border border-gray-100'>
            <div className='flex items-center justify-center mb-4'>
              <svg
                className='w-16 h-16 text-yellow-500'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>

            <h2 className='text-2xl font-semibold text-gray-800 mb-3'>
              Próximamente Disponible
            </h2>

            <p className='text-gray-600 mb-6'>
              Esta práctica se encuentra actualmente en desarrollo. Incluirá el
              diseño completo y la implementación de una visualización
              interactiva innovadora.
            </p>

            <div className='inline-flex items-center text-yellow-600 font-medium'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse'></div>
              En progreso
            </div>
          </div>

          {/* Features Preview */}
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
            <div className='bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Diseño Centrado en Usuario
              </h3>
              <p className='text-sm text-gray-600'>
                Investigación de usuarios, personas y journey mapping para
                optimizar la experiencia.
              </p>
            </div>

            <div className='bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <div className='w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-pink-600'
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
              </div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Interactividad Avanzada
              </h3>
              <p className='text-sm text-gray-600'>
                Implementación de técnicas de interacción innovadoras y
                responsivas.
              </p>
            </div>

            <div className='bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <div className='w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-indigo-600'
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
              </div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Visualización Completa
              </h3>
              <p className='text-sm text-gray-600'>
                Desarrollo end-to-end desde el concepto hasta la implementación
                final.
              </p>
            </div>
          </div>

          {/* Methodology Preview */}
          <div className='mt-12 bg-white/70 backdrop-blur-sm rounded-xl p-8 border border-white/20'>
            <h3 className='text-lg font-semibold text-gray-800 mb-4'>
              Metodología de Desarrollo
            </h3>
            <div className='flex flex-wrap justify-center gap-4'>
              <div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                1. Investigación
              </div>
              <div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                2. Conceptualización
              </div>
              <div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                3. Prototipado
              </div>
              <div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                4. Implementación
              </div>
              <div className='bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium'>
                5. Evaluación
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
