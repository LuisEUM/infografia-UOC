import React from "react";
import { Layers } from "lucide-react";

export function Architecture() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
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
            • <strong>Escalabilidad:</strong> Nuevas características se agregan
            como nuevas carpetas de features
          </li>
          <li>
            • <strong>Colaboración:</strong> Los desarrolladores encuentran
            rápidamente dónde trabajar
          </li>
        </ul>
      </div>
    </div>
  );
}
