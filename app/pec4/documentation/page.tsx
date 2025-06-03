"use client";

import React from "react";
import Link from "next/link";
import {
  Map,
  BarChart3,
  Database,
  Code,
  Users,
  Palette,
  Filter,
  Eye,
  MousePointer,
  Layers,
  TrendingUp,
  Info,
} from "lucide-react";

export default function DocumentationPage() {
  return (
    <main className='container mx-auto px-4 py-10 max-w-6xl'>
      <div className='mb-8'>
        <h1 className='text-4xl font-bold mb-4 text-gray-900'>
          📊 Documentación: Explorador de Datos de Emisiones de CO₂
        </h1>
        <p className='text-xl text-gray-600 mb-6'>
          Documentación completa sobre metodología, arquitectura y uso de la
          aplicación de visualización de emisiones de CO₂
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

      {/* Índice de Contenidos */}
      <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md p-6 mb-8 border-l-4 border-blue-500'>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <Info className='w-5 h-5 mr-2 text-blue-600' />
          Índice de Contenidos
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <h4 className='font-medium mb-2'>📊 Datos y Metodología</h4>
            <ul className='text-sm space-y-1 ml-4 list-disc'>
              <li>
                <a
                  href='#procesamiento'
                  className='text-blue-600 hover:underline'
                >
                  Procesamiento de Datos
                </a>
              </li>
              <li>
                <a href='#estructura' className='text-blue-600 hover:underline'>
                  Estructura de Datos
                </a>
              </li>
              <li>
                <a href='#limpieza' className='text-blue-600 hover:underline'>
                  Limpieza y Validación
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium mb-2'>🏗️ Arquitectura Técnica</h4>
            <ul className='text-sm space-y-1 ml-4 list-disc'>
              <li>
                <a
                  href='#arquitectura'
                  className='text-blue-600 hover:underline'
                >
                  Screaming Architecture
                </a>
              </li>
              <li>
                <a
                  href='#tecnologias'
                  className='text-blue-600 hover:underline'
                >
                  Stack Tecnológico
                </a>
              </li>
              <li>
                <a
                  href='#componentes'
                  className='text-blue-600 hover:underline'
                >
                  Componentes Principales
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium mb-2'>🎨 Visualizaciones</h4>
            <ul className='text-sm space-y-1 ml-4 list-disc'>
              <li>
                <a href='#mapa' className='text-blue-600 hover:underline'>
                  Mapa Interactivo
                </a>
              </li>
              <li>
                <a href='#series' className='text-blue-600 hover:underline'>
                  Series Temporales
                </a>
              </li>
              <li>
                <a href='#ranking' className='text-blue-600 hover:underline'>
                  Tabla de Ranking
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className='font-medium mb-2'>📖 Guía de Usuario</h4>
            <ul className='text-sm space-y-1 ml-4 list-disc'>
              <li>
                <a href='#navegacion' className='text-blue-600 hover:underline'>
                  Navegación
                </a>
              </li>
              <li>
                <a href='#filtros' className='text-blue-600 hover:underline'>
                  Filtros y Controles
                </a>
              </li>
              <li>
                <a
                  href='#interaccion'
                  className='text-blue-600 hover:underline'
                >
                  Interacciones
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Procesamiento de Datos */}
      <div
        id='procesamiento'
        className='bg-white rounded-lg shadow-md p-6 mb-8'
      >
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <Database className='w-6 h-6 mr-2 text-green-600' />
          Metodología de Procesamiento de Datos
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6'>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h4 className='font-medium mb-2'>📈 Dataset Original</h4>
            <ul className='text-sm space-y-1'>
              <li>
                <strong>Fuente:</strong> Our World in Data
              </li>
              <li>
                <strong>Registros:</strong> ~50,000 entradas
              </li>
              <li>
                <strong>Período:</strong> 1750-2022
              </li>
              <li>
                <strong>Países:</strong> 200+ territorios
              </li>
            </ul>
          </div>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <h4 className='font-medium mb-2'>🎯 Dataset Procesado</h4>
            <ul className='text-sm space-y-1'>
              <li>
                <strong>Registros válidos:</strong> ~45,000
              </li>
              <li>
                <strong>Países activos:</strong> 195 países
              </li>
              <li>
                <strong>Variables:</strong> 6 métricas principales
              </li>
              <li>
                <strong>Continentes:</strong> 6 regiones
              </li>
            </ul>
          </div>
        </div>

        <h3 className='text-lg font-medium mt-6 mb-3'>
          🔧 Paso 1: Determinación de Tipos de Datos por Columna
        </h3>
        <div className='overflow-x-auto mb-6'>
          <table className='min-w-full bg-white border border-gray-200 rounded-lg'>
            <thead>
              <tr className='bg-gradient-to-r from-gray-50 to-gray-100'>
                <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>
                  Tipo de Dato
                </th>
                <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>
                  Campos
                </th>
                <th className='py-3 px-4 border-b border-gray-200 text-left text-sm font-semibold text-gray-700'>
                  Descripción
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='hover:bg-gray-50'>
                <td className='py-3 px-4 border-b border-gray-200 font-medium text-blue-600'>
                  Texto (String)
                </td>
                <td className='py-3 px-4 border-b border-gray-200 font-mono text-sm'>
                  iso_code, country, continent
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>
                  Identificadores y nombres descriptivos
                </td>
              </tr>
              <tr className='hover:bg-gray-50'>
                <td className='py-3 px-4 border-b border-gray-200 font-medium text-green-600'>
                  Decimal (Float)
                </td>
                <td className='py-3 px-4 border-b border-gray-200 font-mono text-sm'>
                  co2, co2_per_capita, share_global_co2, co2_per_gdp
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>
                  Métricas de emisiones con precisión decimal
                </td>
              </tr>
              <tr className='hover:bg-gray-50'>
                <td className='py-3 px-4 border-b border-gray-200 font-medium text-purple-600'>
                  Entero (Integer)
                </td>
                <td className='py-3 px-4 border-b border-gray-200 font-mono text-sm'>
                  year, population, gdp
                </td>
                <td className='py-3 px-4 border-b border-gray-200 text-sm text-gray-600'>
                  Valores temporales y demográficos enteros
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className='text-lg font-medium mt-6 mb-3'>
          🧹 Paso 2: Detección y Reemplazo de Valores Vacíos
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-6'>
          <div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400'>
            <h4 className='font-medium text-blue-800 mb-2'>Campos Decimales</h4>
            <p className='text-sm text-blue-700'>Valores vacíos → 0.0</p>
            <p className='text-xs text-blue-600 mt-1'>
              Permite cálculos matemáticos seguros
            </p>
          </div>
          <div className='bg-green-50 p-4 rounded-lg border-l-4 border-green-400'>
            <h4 className='font-medium text-green-800 mb-2'>Campos Enteros</h4>
            <p className='text-sm text-green-700'>Valores vacíos → 0</p>
            <p className='text-xs text-green-600 mt-1'>
              Mantiene integridad numérica
            </p>
          </div>
          <div className='bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400'>
            <h4 className='font-medium text-yellow-800 mb-2'>
              Campos de Texto
            </h4>
            <p className='text-sm text-yellow-700'>Valores vacíos → ""</p>
            <p className='text-xs text-yellow-600 mt-1'>
              Preserva estructura de strings
            </p>
          </div>
        </div>

        <h3 className='text-lg font-medium mt-6 mb-3'>
          ⚠️ Paso 3: Corrección de Errores en los Datos
        </h3>
        <div className='space-y-4 mb-6'>
          <div className='bg-red-50 border-l-4 border-red-400 p-4'>
            <h4 className='font-medium text-red-800 mb-2'>
              Eliminación de Entidades No-País
            </h4>
            <ul className='text-sm text-red-700 space-y-1'>
              <li>• North America, South America (regiones continentales)</li>
              <li>• Ryukyu Islands (territorio histórico)</li>
              <li>• St. Kitts-Nevis-Anguilla (confederación disuelta)</li>
            </ul>
          </div>

          <div className='bg-orange-50 border-l-4 border-orange-400 p-4'>
            <h4 className='font-medium text-orange-800 mb-2'>
              Corrección de Datos Temporales
            </h4>
            <p className='text-sm text-orange-700'>
              Eliminación de años anómalos (1-19) en países como Canadá y
              Venezuela que causaban distorsiones en visualizaciones temporales.
            </p>
          </div>

          <div className='bg-green-50 border-l-4 border-green-400 p-4'>
            <h4 className='font-medium text-green-800 mb-2'>
              Enriquecimiento de Datos
            </h4>
            <ul className='text-sm text-green-700 space-y-1'>
              <li>
                • Adición de variable "continente" para agrupación geográfica
              </li>
              <li>• Completado de nombres faltantes (ej: Francia)</li>
              <li>• Agregación de códigos ISO faltantes (CAN, FSM, etc.)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Estructura de Datos */}
      <div id='estructura' className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <Code className='w-6 h-6 mr-2 text-blue-600' />
          Estructura de Datos y Variables
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mb-3'>
              📊 Variables Principales
            </h3>
            <div className='space-y-3'>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-blue-600'>co2</h4>
                <p className='text-sm text-gray-600'>
                  Emisiones totales de CO₂ (millones de toneladas)
                </p>
              </div>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-green-600'>co2_per_capita</h4>
                <p className='text-sm text-gray-600'>
                  Emisiones per cápita (toneladas por persona)
                </p>
              </div>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-purple-600'>
                  share_global_co2
                </h4>
                <p className='text-sm text-gray-600'>
                  Porcentaje del total global (%)
                </p>
              </div>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-red-600'>co2_per_gdp</h4>
                <p className='text-sm text-gray-600'>
                  Intensidad de carbono por PIB
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3'>
              🗂️ Variables de Contexto
            </h3>
            <div className='space-y-3'>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-gray-700'>year</h4>
                <p className='text-sm text-gray-600'>
                  Año del registro (1750-2022)
                </p>
              </div>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-gray-700'>population</h4>
                <p className='text-sm text-gray-600'>Población del país</p>
              </div>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-gray-700'>gdp</h4>
                <p className='text-sm text-gray-600'>Producto Interno Bruto</p>
              </div>
              <div className='border border-gray-200 rounded p-3'>
                <h4 className='font-medium text-gray-700'>continent</h4>
                <p className='text-sm text-gray-600'>
                  Agrupación geográfica (6 continentes)
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-6 bg-gray-50 p-4 rounded-lg'>
          <h4 className='font-medium mb-2'>💡 Ejemplo de Registro de Datos</h4>
          <pre className='text-sm bg-gray-800 text-green-400 p-3 rounded overflow-x-auto'>
            {`{
  "iso_code": "ESP",
  "country": "Spain", 
  "continent": "Europe",
  "year": 2022,
  "co2": 256.8,
  "co2_per_capita": 5.4,
  "share_global_co2": 0.7,
  "co2_per_gdp": 0.19,
  "population": 47615034,
  "gdp": 1.39e12
}`}
          </pre>
        </div>
      </div>

      {/* Arquitectura */}
      <div id='arquitectura' className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <Layers className='w-6 h-6 mr-2 text-purple-600' />
          Arquitectura de Screaming Architecture
        </h2>

        <div className='mb-6'>
          <p className='text-gray-600 mb-4'>
            La aplicación utiliza <strong>Screaming Architecture</strong>,
            organizando el código por <em>funcionalidades de dominio</em>
            en lugar de tipos técnicos, haciendo que la estructura del proyecto
            "grite" su propósito.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mb-3 text-green-600'>
              ✅ Estructura Actual (Screaming)
            </h3>
            <div className='bg-green-50 p-4 rounded border-l-4 border-green-400'>
              <pre className='text-sm text-green-800 whitespace-pre-wrap'>
                {`app/pec4/
├── features/
│   ├── geographic/        # 🗺️ Visualización de mapas
│   ├── temporal/          # 📈 Series temporales  
│   ├── rankings/          # 🏆 Tablas de ranking
│   ├── filters/           # 🔍 Controles de filtrado
│   └── shared/            # 🔧 Componentes comunes
├── data/                  # 📊 Utilidades de datos
├── theme/                 # 🎨 Sistema de colores
└── routes/                # 🛣️ Páginas específicas`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className='text-lg font-medium mb-3 text-red-600'>
              ❌ Estructura Tradicional
            </h3>
            <div className='bg-red-50 p-4 rounded border-l-4 border-red-400'>
              <pre className='text-sm text-red-800 whitespace-pre-wrap'>
                {`app/
├── components/           # 😕 ¿Qué tipo de componentes?
├── hooks/               # 😕 ¿Para qué funcionalidad?
├── utils/               # 😕 ¿Qué utilidades?
├── context/             # 😕 ¿Qué contexto?
└── types/               # 😕 ¿Tipos de qué dominio?`}
              </pre>
            </div>
          </div>
        </div>

        <div className='mt-6 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400'>
          <h4 className='font-medium text-blue-800 mb-2'>
            🎯 Beneficios de Screaming Architecture
          </h4>
          <ul className='text-sm text-blue-700 space-y-1'>
            <li>
              • <strong>Claridad de propósito:</strong> La estructura revela
              inmediatamente las funcionalidades principales
            </li>
            <li>
              • <strong>Mantenibilidad:</strong> Cambios en una funcionalidad se
              localizan en su directorio específico
            </li>
            <li>
              • <strong>Escalabilidad:</strong> Nuevas características se
              agregan como nuevas carpetas de features
            </li>
            <li>
              • <strong>Colaboración:</strong> Los desarrolladores encuentran
              rápidamente dónde trabajar
            </li>
          </ul>
        </div>
      </div>

      {/* Tecnologías */}
      <div id='tecnologias' className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <Code className='w-6 h-6 mr-2 text-indigo-600' />
          Stack Tecnológico
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400'>
            <h3 className='font-medium text-blue-800 mb-3'>
              ⚛️ Frontend Framework
            </h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>React 18:</strong> Biblioteca principal de UI
              </li>
              <li>
                <strong>Next.js 14:</strong> Framework full-stack
              </li>
              <li>
                <strong>TypeScript:</strong> Tipado estático
              </li>
            </ul>
          </div>

          <div className='bg-green-50 p-4 rounded-lg border-l-4 border-green-400'>
            <h3 className='font-medium text-green-800 mb-3'>
              📊 Visualización
            </h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>react-simple-maps:</strong> Mapas interactivos
              </li>
              <li>
                <strong>ReCharts:</strong> Gráficos de líneas
              </li>
              <li>
                <strong>D3.js:</strong> Manipulación de datos
              </li>
            </ul>
          </div>

          <div className='bg-purple-50 p-4 rounded-lg border-l-4 border-purple-400'>
            <h3 className='font-medium text-purple-800 mb-3'>🎨 UI/UX</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>Tailwind CSS:</strong> Framework de estilos
              </li>
              <li>
                <strong>Shadcn/ui:</strong> Componentes reutilizables
              </li>
              <li>
                <strong>Lucide Icons:</strong> Iconografía consistente
              </li>
            </ul>
          </div>

          <div className='bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400'>
            <h3 className='font-medium text-orange-800 mb-3'>
              🔧 Estado y Datos
            </h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>React Context:</strong> Gestión de estado global
              </li>
              <li>
                <strong>CSV Parser:</strong> Procesamiento de datos
              </li>
              <li>
                <strong>Custom Hooks:</strong> Lógica reutilizable
              </li>
            </ul>
          </div>

          <div className='bg-red-50 p-4 rounded-lg border-l-4 border-red-400'>
            <h3 className='font-medium text-red-800 mb-3'>🚀 Despliegue</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>Vercel:</strong> Hosting y CI/CD
              </li>
              <li>
                <strong>Git:</strong> Control de versiones
              </li>
              <li>
                <strong>ESLint:</strong> Calidad de código
              </li>
            </ul>
          </div>

          <div className='bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400'>
            <h3 className='font-medium text-gray-800 mb-3'>📦 Herramientas</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>npm:</strong> Gestión de paquetes
              </li>
              <li>
                <strong>Prettier:</strong> Formateo de código
              </li>
              <li>
                <strong>TopJSON:</strong> Datos geográficos optimizados
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Guía de Usuario Extendida */}
      <div id='navegacion' className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-2xl font-semibold mb-4 flex items-center'>
          <Users className='w-6 h-6 mr-2 text-green-600' />
          Guía Completa de Usuario
        </h2>

        {/* Navegación */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-4 flex items-center'>
            <MousePointer className='w-5 h-5 mr-2 text-blue-600' />
            Sistema de Navegación
          </h3>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            <div className='bg-blue-50 p-4 rounded-lg'>
              <h4 className='font-medium text-blue-800 mb-2'>
                🏠 Dashboard Principal
              </h4>
              <p className='text-sm text-blue-700 mb-2'>
                Vista global con todos los continentes
              </p>
              <ul className='text-xs text-blue-600 space-y-1'>
                <li>• Mapa mundial interactivo</li>
                <li>• Estadísticas globales</li>
                <li>• Ranking de todos los países</li>
                <li>• Análisis de series temporales</li>
              </ul>
            </div>

            <div className='bg-green-50 p-4 rounded-lg'>
              <h4 className='font-medium text-green-800 mb-2'>
                🌍 Páginas de Continentes
              </h4>
              <p className='text-sm text-green-700 mb-2'>
                Vista específica por continente
              </p>
              <ul className='text-xs text-green-600 space-y-1'>
                <li>• Datos filtrados por continente</li>
                <li>• Estadísticas regionales</li>
                <li>• Rankings continentales</li>
                <li>• Comparaciones intrarregionales</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Filtros y Controles */}
        <div id='filtros' className='mb-8'>
          <h3 className='text-lg font-medium mb-4 flex items-center'>
            <Filter className='w-5 h-5 mr-2 text-purple-600' />
            Filtros y Controles Avanzados
          </h3>

          <div className='space-y-4'>
            <div className='border border-gray-200 rounded-lg p-4'>
              <h4 className='font-medium mb-2 text-gray-800'>
                📊 Selección de Variables
              </h4>
              <div className='grid grid-cols-2 md:grid-cols-4 gap-3 text-sm'>
                <div className='bg-blue-100 p-2 rounded text-center'>
                  <div className='font-medium text-blue-800'>CO₂ Total</div>
                  <div className='text-xs text-blue-600'>Mill. toneladas</div>
                </div>
                <div className='bg-green-100 p-2 rounded text-center'>
                  <div className='font-medium text-green-800'>Per Cápita</div>
                  <div className='text-xs text-green-600'>
                    Toneladas/persona
                  </div>
                </div>
                <div className='bg-purple-100 p-2 rounded text-center'>
                  <div className='font-medium text-purple-800'>% Global</div>
                  <div className='text-xs text-purple-600'>Porcentaje</div>
                </div>
                <div className='bg-red-100 p-2 rounded text-center'>
                  <div className='font-medium text-red-800'>CO₂/PIB</div>
                  <div className='text-xs text-red-600'>Intensidad</div>
                </div>
              </div>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h4 className='font-medium mb-2 text-gray-800'>
                📅 Control Temporal
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm'>
                <div className='bg-orange-50 p-3 rounded'>
                  <strong>Año único:</strong> Análisis de un año específico
                </div>
                <div className='bg-orange-50 p-3 rounded'>
                  <strong>Rango temporal:</strong> Promedio entre años
                  seleccionados
                </div>
                <div className='bg-orange-50 p-3 rounded'>
                  <strong>Serie completa:</strong> Evolución temporal en
                  gráficos
                </div>
              </div>
            </div>

            <div className='border border-gray-200 rounded-lg p-4'>
              <h4 className='font-medium mb-2 text-gray-800'>
                🎨 Modos de Color
              </h4>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='bg-gradient-to-r from-red-100 via-yellow-100 via-green-100 via-blue-100 via-purple-100 to-pink-100 p-3 rounded'>
                  <strong>Grupos:</strong> Cada continente con color distinto
                </div>
                <div className='bg-gradient-to-r from-cyan-100 to-cyan-600 p-3 rounded'>
                  <strong>Escala:</strong> Escala de cyan basada en valores
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interacciones */}
        <div id='interaccion' className='mb-8'>
          <h3 className='text-lg font-medium mb-4 flex items-center'>
            <Eye className='w-5 h-5 mr-2 text-indigo-600' />
            Interacciones y Funcionalidades
          </h3>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            <div>
              <h4 className='font-medium mb-3 text-gray-800'>
                🗺️ Mapa Interactivo
              </h4>
              <ul className='space-y-2 text-sm text-gray-700'>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                  <strong>Hover:</strong> Información detallada en tooltip
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                  <strong>Click:</strong> Selección/deselección de países
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full mr-2'></span>
                  <strong>Zoom:</strong> Botones + / - para acercar/alejar
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-red-500 rounded-full mr-2'></span>
                  <strong>Pan:</strong> Arrastrar para mover el mapa
                </li>
              </ul>
            </div>

            <div>
              <h4 className='font-medium mb-3 text-gray-800'>
                📊 Tabla de Ranking
              </h4>
              <ul className='space-y-2 text-sm text-gray-700'>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-blue-500 rounded-full mr-2'></span>
                  <strong>Popovers:</strong> Información completa en hover
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-green-500 rounded-full mr-2'></span>
                  <strong>Paginación:</strong> Navegación por páginas
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-purple-500 rounded-full mr-2'></span>
                  <strong>Búsqueda:</strong> Filtrado por nombre de país
                </li>
                <li className='flex items-center'>
                  <span className='w-2 h-2 bg-red-500 rounded-full mr-2'></span>
                  <strong>Iconos ojo:</strong> Selección para series temporales
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Series Temporales */}
        <div className='mb-8'>
          <h3 className='text-lg font-medium mb-4 flex items-center'>
            <TrendingUp className='w-5 h-5 mr-2 text-orange-600' />
            Análisis de Series Temporales
          </h3>

          <div className='bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <h4 className='font-medium text-orange-800 mb-2'>
                  ✨ Características
                </h4>
                <ul className='text-sm text-orange-700 space-y-1'>
                  <li>• Hasta 5 países simultáneos</li>
                  <li>• Colores distintivos por país</li>
                  <li>• Tooltips con valores precisos</li>
                  <li>• Zoom temporal interactivo</li>
                </ul>
              </div>
              <div>
                <h4 className='font-medium text-orange-800 mb-2'>
                  🎯 Casos de Uso
                </h4>
                <ul className='text-sm text-orange-700 space-y-1'>
                  <li>• Comparar evoluciones históricas</li>
                  <li>• Identificar tendencias regionales</li>
                  <li>• Analizar impactos de políticas</li>
                  <li>• Detectar anomalías temporales</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decisiones de Implementación */}
      <div className='bg-white rounded-lg shadow-md p-6 mb-8'>
        <h2 className='text-xl font-semibold mb-4'>
          🔧 Decisiones de Implementación y Optimizaciones
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div>
            <h3 className='text-lg font-medium mt-4 mb-3 text-blue-600'>
              ⚡ Optimizaciones de Rendimiento
            </h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>Memoización:</strong> useMemo para cálculos costosos
              </li>
              <li>
                <strong>Lazy Loading:</strong> Carga diferida de componentes
              </li>
              <li>
                <strong>Virtualización:</strong> Paginación en tablas grandes
              </li>
              <li>
                <strong>Debouncing:</strong> Retrasos en búsquedas y filtros
              </li>
              <li>
                <strong>Context optimizado:</strong> Separación de estados por
                dominio
              </li>
            </ul>
          </div>

          <div>
            <h3 className='text-lg font-medium mt-4 mb-3 text-green-600'>
              🎨 Decisiones de UX/UI
            </h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <strong>Responsive Design:</strong> Adaptable a móviles y
                desktop
              </li>
              <li>
                <strong>Accesibilidad:</strong> ARIA labels y navegación por
                teclado
              </li>
              <li>
                <strong>Feedback visual:</strong> Loading states y animaciones
              </li>
              <li>
                <strong>Consistencia:</strong> Design system con Shadcn/ui
              </li>
              <li>
                <strong>Internacionalización:</strong> Interfaz completamente en
                español
              </li>
            </ul>
          </div>
        </div>

        <div className='mt-6 bg-yellow-50 border-l-4 border-yellow-400 p-4'>
          <h4 className='font-medium text-yellow-800 mb-2'>
            🚧 Limitaciones Conocidas
          </h4>
          <ul className='text-sm text-yellow-700 space-y-1'>
            <li>
              • Algunos territorios pequeños no son visibles en el mapa mundial
            </li>
            <li>
              • Los datos de PIB pueden tener diferentes metodologías de cálculo
            </li>
            <li>
              • La precisión geográfica está limitada por la resolución del
              TopoJSON
            </li>
            <li>• Países con datos insuficientes aparecen en gris</li>
          </ul>
        </div>
      </div>

      {/* Enlaces de Navegación */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-8'>
        <Link
          href='/pec4'
          className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors'
        >
          <Map className='w-5 h-5 mr-2' />
          Dashboard Principal
        </Link>

        <Link
          href='/pec4/theme'
          className='inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 transition-colors'
        >
          <Palette className='w-5 h-5 mr-2' />
          Sistema de Colores
        </Link>

        <Link
          href='/'
          className='inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors'
        >
          🏠 Inicio
        </Link>
      </div>
    </main>
  );
}
