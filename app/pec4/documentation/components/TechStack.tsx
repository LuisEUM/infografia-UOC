import React from "react";
import { Code } from "lucide-react";

export function TechStack() {
  return (
    <div className='bg-white rounded-lg shadow-md p-6'>
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
          <h3 className='font-medium text-green-800 mb-3'>📊 Visualización</h3>
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

      {/* Decisiones de Implementación */}
      <div className='mt-8'>
        <h3 className='text-xl font-semibold mb-4'>
          🔧 Decisiones de Implementación y Optimizaciones
        </h3>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div>
            <h4 className='text-lg font-medium mt-4 mb-3 text-blue-600'>
              ⚡ Optimizaciones de Rendimiento
            </h4>
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
            <h4 className='text-lg font-medium mt-4 mb-3 text-green-600'>
              🎨 Decisiones de UX/UI
            </h4>
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
    </div>
  );
}
