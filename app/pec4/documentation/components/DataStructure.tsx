import React from "react";
import { Code } from "lucide-react";

export function DataStructure() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
      <h2 className='text-2xl font-semibold mb-4 flex items-center'>
        <Code className='w-6 h-6 mr-2 text-blue-600' />
        Estructura de Datos y Variables
      </h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <div>
          <h3 className='text-lg font-medium mb-3'>📊 Variables Principales</h3>
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
              <h4 className='font-medium text-purple-600'>share_global_co2</h4>
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
          <h3 className='text-lg font-medium mb-3'>🗂️ Variables de Contexto</h3>
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

      {/* Relaciones entre variables */}
      <div className='mt-6'>
        <h3 className='text-lg font-medium mb-3'>
          🔗 Relaciones entre Variables
        </h3>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div className='bg-blue-50 border-l-4 border-blue-400 p-4'>
            <h4 className='font-medium text-blue-800 mb-2'>
              Cálculos Derivados
            </h4>
            <ul className='text-sm text-blue-700 space-y-1'>
              <li>
                • <strong>co2_per_capita</strong> = co2 / population
              </li>
              <li>
                • <strong>share_global_co2</strong> = (co2 / total_global) × 100
              </li>
              <li>
                • <strong>co2_per_gdp</strong> = co2 / gdp
              </li>
            </ul>
          </div>

          <div className='bg-green-50 border-l-4 border-green-400 p-4'>
            <h4 className='font-medium text-green-800 mb-2'>Validaciones</h4>
            <ul className='text-sm text-green-700 space-y-1'>
              <li>• Años válidos: 1750-2022</li>
              <li>• Población &gt; 0 para cálculos per cápita</li>
              <li>• PIB &gt; 0 para intensidad de carbono</li>
              <li>• Continente debe existir en la lista</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
