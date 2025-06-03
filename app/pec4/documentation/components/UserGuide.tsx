import React from "react";
import {
  Users,
  MousePointer,
  Filter,
  Eye,
  TrendingUp,
  Map as MapIcon,
} from "lucide-react";

interface UserGuideProps {
  section?: "navigation" | "filters" | "interactions";
}

export function UserGuide({ section }: UserGuideProps) {
  if (section === "navigation") {
    return <NavigationSection />;
  } else if (section === "filters") {
    return <FiltersSection />;
  } else if (section === "interactions") {
    return <InteractionsSection />;
  }

  // Show complete user guide if no specific section
  return (
    <div className='space-y-8'>
      <NavigationSection />
      <FiltersSection />
      <InteractionsSection />
    </div>
  );
}

function NavigationSection() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-semibold mb-4 flex items-center'>
        <MousePointer className='w-6 h-6 mr-2 text-blue-600' />
        Sistema de Navegación
      </h2>

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
  );
}

function FiltersSection() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-semibold mb-4 flex items-center'>
        <Filter className='w-6 h-6 mr-2 text-purple-600' />
        Filtros y Controles Avanzados
      </h2>

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
              <div className='text-xs text-green-600'>Toneladas/persona</div>
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
              <strong>Rango temporal:</strong> Promedio entre años seleccionados
            </div>
            <div className='bg-orange-50 p-3 rounded'>
              <strong>Serie completa:</strong> Evolución temporal en gráficos
            </div>
          </div>
        </div>

        <div className='border border-gray-200 rounded-lg p-4'>
          <h4 className='font-medium mb-2 text-gray-800'>🎨 Modos de Color</h4>
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
  );
}

function InteractionsSection() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-semibold mb-4 flex items-center'>
        <Eye className='w-6 h-6 mr-2 text-indigo-600' />
        Interacciones y Funcionalidades
      </h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
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

      {/* Series Temporales */}
      <div className='bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 p-4 rounded-lg'>
        <h3 className='text-lg font-medium mb-4 flex items-center'>
          <TrendingUp className='w-5 h-5 mr-2 text-orange-600' />
          Análisis de Series Temporales
        </h3>
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
  );
}
