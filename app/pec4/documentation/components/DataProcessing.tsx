import React from "react";
import { Database } from "lucide-react";

export function DataProcessing() {
  return (
    <div id='procesamiento' className='bg-white rounded-lg shadow-md p-6 mb-8'>
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
          <h4 className='font-medium text-yellow-800 mb-2'>Campos de Texto</h4>
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
  );
}
