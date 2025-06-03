"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DataProcessing } from "./components/DataProcessing";
import { DataStructure } from "./components/DataStructure";
import { Architecture } from "./components/Architecture";
import { TechStack } from "./components/TechStack";
import { UserGuide } from "./components/UserGuide";
import {
  Map,
  BarChart3,
  Database,
  Code,
  Palette,
  FileText,
} from "lucide-react";

export default function DocumentationPage() {
  const searchParams = useSearchParams();
  const section = searchParams.get("section");

  // Render specific section based on query parameter
  if (section === "processing") {
    return <DataProcessing />;
  } else if (section === "structure") {
    return <DataStructure />;
  } else if (section === "architecture") {
    return <Architecture />;
  } else if (section === "tech-stack") {
    return <TechStack />;
  } else if (section === "navigation") {
    return <UserGuide section='navigation' />;
  } else if (section === "filters") {
    return <UserGuide section='filters' />;
  } else if (section === "interactions") {
    return <UserGuide section='interactions' />;
  }

  // Default: Show executive summary and overview
  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-4 text-gray-900'>
          📊 Explorador de Datos de Emisiones de CO₂
        </h1>
        <p className='text-xl text-gray-600 mb-6'>
          Documentación técnica y guía de usuario para la plataforma de
          visualización de emisiones de CO₂
        </p>
        <div className='flex flex-wrap gap-4 mb-6'>
          <div className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
            PEC 4 - Infografía y Visualización
          </div>
          <div className='bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium'>
            React + Next.js
          </div>
          <div className='bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium'>
            TypeScript
          </div>
        </div>
      </div>

      {/* Resumen Ejecutivo */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4'>🎯 Resumen Ejecutivo</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mb-3 text-blue-600'>
              Propósito
            </h3>
            <p className='text-gray-700 mb-4'>
              Esta aplicación proporciona una plataforma interactiva para
              explorar y analizar datos de emisiones de CO₂ a nivel mundial,
              permitiendo comparaciones temporales y geográficas con
              visualizaciones avanzadas.
            </p>

            <h3 className='text-lg font-medium mb-3 text-green-600'>
              Características Clave
            </h3>
            <ul className='text-sm text-gray-700 space-y-1'>
              <li>
                • <strong>Mapa interactivo</strong> con zoom y navegación
              </li>
              <li>
                • <strong>Series temporales</strong> para análisis de tendencias
              </li>
              <li>
                • <strong>Rankings dinámicos</strong> con filtros avanzados
              </li>
              <li>
                • <strong>Dos modos de color</strong> para diferentes análisis
              </li>
              <li>
                • <strong>Navegación por continentes</strong> especializada
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3 text-purple-600'>
              Tecnologías
            </h3>
            <div className='grid grid-cols-2 gap-2 mb-4'>
              <div className='bg-blue-50 p-2 rounded text-center text-sm'>
                React 18
              </div>
              <div className='bg-green-50 p-2 rounded text-center text-sm'>
                Next.js 14
              </div>
              <div className='bg-purple-50 p-2 rounded text-center text-sm'>
                TypeScript
              </div>
              <div className='bg-yellow-50 p-2 rounded text-center text-sm'>
                Tailwind CSS
              </div>
              <div className='bg-pink-50 p-2 rounded text-center text-sm'>
                ReCharts
              </div>
              <div className='bg-indigo-50 p-2 rounded text-center text-sm'>
                Simple Maps
              </div>
            </div>

            <h3 className='text-lg font-medium mb-3 text-orange-600'>
              Arquitectura
            </h3>
            <p className='text-sm text-gray-700'>
              Implementa <strong>Screaming Architecture</strong> organizando el
              código por funcionalidades de dominio en lugar de tipos técnicos,
              facilitando el mantenimiento y escalabilidad.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
        <Link
          href='/pec4/documentation/colors'
          className='bg-gradient-to-br from-pink-50 to-purple-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group'
        >
          <div className='flex items-center mb-3'>
            <Palette className='w-8 h-8 text-pink-600 mr-3' />
            <h3 className='text-lg font-semibold group-hover:text-pink-700'>
              Sistema de Colores
            </h3>
          </div>
          <p className='text-gray-600 text-sm'>
            Explora los dos modos de coloración: grupos por continente y escala
            cyan para análisis cuantitativos.
          </p>
        </Link>

        <Link
          href='/pec4'
          className='bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group'
        >
          <div className='flex items-center mb-3'>
            <Map className='w-8 h-8 text-blue-600 mr-3' />
            <h3 className='text-lg font-semibold group-hover:text-blue-700'>
              Dashboard
            </h3>
          </div>
          <p className='text-gray-600 text-sm'>
            Accede al dashboard principal con mapa interactivo, estadísticas
            globales y análisis de tendencias.
          </p>
        </Link>

        <Link
          href='/pec4/documentation?section=processing'
          className='bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow group'
        >
          <div className='flex items-center mb-3'>
            <Database className='w-8 h-8 text-green-600 mr-3' />
            <h3 className='text-lg font-semibold group-hover:text-green-700'>
              Metodología
            </h3>
          </div>
          <p className='text-gray-600 text-sm'>
            Conoce el proceso de limpieza, validación y estructuración de los
            datos de emisiones de CO₂.
          </p>
        </Link>
      </div>

      {/* Features Overview */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-6'>
          ✨ Funcionalidades Principales
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='space-y-4'>
            <div className='flex items-start'>
              <div className='bg-blue-100 p-2 rounded-lg mr-3'>
                <Map className='w-5 h-5 text-blue-600' />
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Visualización Geográfica
                </h4>
                <p className='text-sm text-gray-600'>
                  Mapa mundial interactivo con datos de emisiones por país, zoom
                  dinámico y tooltips informativos.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='bg-green-100 p-2 rounded-lg mr-3'>
                <BarChart3 className='w-5 h-5 text-green-600' />
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>Series Temporales</h4>
                <p className='text-sm text-gray-600'>
                  Análisis de tendencias históricas con gráficos de líneas
                  interactivos y comparación de múltiples países.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='bg-purple-100 p-2 rounded-lg mr-3'>
                <FileText className='w-5 h-5 text-purple-600' />
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Rankings Dinámicos
                </h4>
                <p className='text-sm text-gray-600'>
                  Tablas de clasificación con filtros avanzados, búsqueda y
                  paginación inteligente.
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div className='flex items-start'>
              <div className='bg-orange-100 p-2 rounded-lg mr-3'>
                <Palette className='w-5 h-5 text-orange-600' />
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Modos de Visualización
                </h4>
                <p className='text-sm text-gray-600'>
                  Alternancia entre colores por continente y escala
                  monocromática para diferentes tipos de análisis.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='bg-cyan-100 p-2 rounded-lg mr-3'>
                <Database className='w-5 h-5 text-cyan-600' />
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>Filtros Avanzados</h4>
                <p className='text-sm text-gray-600'>
                  Control temporal, selección de variables, filtrado por
                  continente y límites de ranking personalizables.
                </p>
              </div>
            </div>

            <div className='flex items-start'>
              <div className='bg-red-100 p-2 rounded-lg mr-3'>
                <Code className='w-5 h-5 text-red-600' />
              </div>
              <div>
                <h4 className='font-medium text-gray-900'>
                  Arquitectura Escalable
                </h4>
                <p className='text-sm text-gray-600'>
                  Estructura modular basada en dominio con componentes
                  reutilizables y optimizaciones de rendimiento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Guide */}
      <div className='bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-6 border border-gray-200'>
        <h3 className='text-lg font-semibold mb-4 text-center'>
          🧭 Navegación de la Documentación
        </h3>
        <p className='text-gray-600 text-center mb-4'>
          Utiliza el sidebar izquierdo para navegar entre las diferentes
          secciones de la documentación
        </p>
        <div className='flex flex-wrap justify-center gap-4'>
          <Link
            href='/pec4/documentation?section=processing'
            className='bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-green-600'
          >
            📊 Procesamiento de Datos
          </Link>
          <Link
            href='/pec4/documentation?section=architecture'
            className='bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-purple-600'
          >
            🏗️ Arquitectura
          </Link>
          <Link
            href='/pec4/documentation/colors'
            className='bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-pink-600'
          >
            🎨 Sistema de Colores
          </Link>
          <Link
            href='/pec4/documentation?section=navigation'
            className='bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md transition-shadow text-sm font-medium text-gray-700 hover:text-blue-600'
          >
            👤 Guía de Usuario
          </Link>
          <Link
            href='/pec4'
            className='bg-blue-500 text-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md hover:bg-blue-600 transition-all text-sm font-medium'
          >
            🚀 Ir al Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
