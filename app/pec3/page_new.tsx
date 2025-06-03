"use client";

import { BackButton } from "../shared";

export default function PEC3Page() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 to-purple-50'>
      {/* Back to Index Button */}
      <div className='absolute top-8 left-8 z-10'>
        <BackButton href='/' />
      </div>

      {/* Main Content */}
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div className='text-center max-w-2xl'>
          {/* Badge */}
          <div className='mb-6'>
            <span className='bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full'>
              PEC 3
            </span>
          </div>

          {/* Icon */}
          <div className='mb-8'>
            <div className='w-24 h-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg'>
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
                  d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
          </div>

          {/* Title and Description */}
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Selección y rediseño de una mala práctica
          </h1>

          <p className='text-xl text-gray-600 mb-8 leading-relaxed'>
            Análisis crítico y propuesta de mejora de visualizaciones de datos
            existentes, aplicando principios de diseño efectivo y mejores
            prácticas en infografía.
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
              Esta entrega se encuentra actualmente en desarrollo. Pronto estará
              disponible con el análisis completo y las propuestas de mejora.
            </p>

            <div className='inline-flex items-center text-yellow-600 font-medium'>
              <div className='w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse'></div>
              En progreso
            </div>
          </div>

          {/* Features Preview */}
          <div className='mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left'>
            <div className='bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-blue-600'
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
                Análisis Crítico
              </h3>
              <p className='text-sm text-gray-600'>
                Evaluación detallada de visualizaciones existentes y
                identificación de problemas de diseño.
              </p>
            </div>

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
                    d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
                  />
                </svg>
              </div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Propuesta de Mejora
              </h3>
              <p className='text-sm text-gray-600'>
                Rediseño basado en principios de diseño efectivo y mejores
                prácticas.
              </p>
            </div>

            <div className='bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
              <div className='w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4'>
                <svg
                  className='w-6 h-6 text-green-600'
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
              </div>
              <h3 className='font-semibold text-gray-800 mb-2'>
                Implementación
              </h3>
              <p className='text-sm text-gray-600'>
                Desarrollo de la solución mejorada con justificación técnica y
                visual.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
