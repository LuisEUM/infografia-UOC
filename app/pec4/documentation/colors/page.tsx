"use client";

import React, { useState } from "react";
import { CONTINENT_COLORS, CYAN_COLOR_SCALE } from "../../theme/colorUtils";
import { Palette, Globe, BarChart3 } from "lucide-react";

// Función de interpolación linear de colores para el ejemplo
function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}

export default function ColorsPage() {
  const [activeColorMode, setActiveColorMode] = useState<"multi" | "mono">(
    "multi"
  );

  return (
    <div className='max-w-6xl mx-auto'>
      <div className='mb-8'>
        <div className='flex items-center mb-4'>
          <Palette className='w-8 h-8 text-blue-600 mr-3' />
          <h1 className='text-3xl font-bold'>Sistema de Colores</h1>
        </div>
        <p className='text-gray-600 mb-8'>
          Esta sección documenta el sistema completo de colores utilizado en la
          plataforma de visualización de datos de emisiones de CO₂, incluyendo
          los dos modos de coloración disponibles.
        </p>
      </div>

      {/* Color Mode Selector */}
      <div className='mb-8 bg-white rounded-lg shadow p-6'>
        <h2 className='text-2xl font-bold mb-4'>Modos de Coloración</h2>
        <p className='text-gray-600 mb-6'>
          La plataforma ofrece dos modos de coloración que puedes alternar en la
          leyenda:
        </p>

        <div className='flex gap-4 mb-6'>
          <button
            onClick={() => setActiveColorMode("multi")}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeColorMode === "multi"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <Globe className='w-4 h-4 mr-2' />
            Grupos (Varios Colores)
          </button>
          <button
            onClick={() => setActiveColorMode("mono")}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeColorMode === "mono"
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <BarChart3 className='w-4 h-4 mr-2' />
            Escala (Un Color)
          </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div
            className={`p-4 rounded-lg border-2 ${
              activeColorMode === "multi"
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200"
            }`}
          >
            <h3 className='font-bold text-lg mb-2 flex items-center'>
              <Globe className='w-5 h-5 mr-2 text-blue-600' />
              Modo Grupos
            </h3>
            <ul className='text-sm text-gray-700 space-y-1'>
              <li>• Cada continente tiene su propio color</li>
              <li>• Ideal para comparar entre continentes</li>
              <li>• Los rankings se muestran con gradientes</li>
              <li>• Facilita la identificación geográfica</li>
            </ul>
          </div>

          <div
            className={`p-4 rounded-lg border-2 ${
              activeColorMode === "mono"
                ? "border-cyan-500 bg-cyan-50"
                : "border-gray-200"
            }`}
          >
            <h3 className='font-bold text-lg mb-2 flex items-center'>
              <BarChart3 className='w-5 h-5 mr-2 text-cyan-600' />
              Modo Escala
            </h3>
            <ul className='text-sm text-gray-700 space-y-1'>
              <li>• Escala única de colores cyan</li>
              <li>• Ideal para comparar valores absolutos</li>
              <li>• Los colores reflejan la magnitud del dato</li>
              <li>• Mejor para análisis cuantitativos</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Conditional Content Based on Selected Mode */}
      {activeColorMode === "multi" ? (
        <>
          {/* Continent Colors */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <Globe className='w-6 h-6 mr-2 text-blue-600' />
                Paleta de Colores por Continente
              </h2>
              <p className='mb-4 text-gray-600'>
                Cada continente tiene una paleta distintiva con tres
                variaciones: color base, oscuro (ranking alto), y claro (ranking
                bajo).
              </p>

              <div className='space-y-4'>
                {Object.entries(CONTINENT_COLORS).map(([continent, colors]) => (
                  <div key={continent} className='border rounded-lg p-4'>
                    <h3 className='font-semibold mb-3 text-lg'>{continent}</h3>
                    <div className='grid grid-cols-3 gap-3'>
                      <div className='flex flex-col items-center'>
                        <div
                          className='w-16 h-16 rounded-lg mb-2 shadow-md'
                          style={{ backgroundColor: colors.top }}
                        ></div>
                        <span className='text-xs font-medium'>Top 1-3</span>
                        <span className='text-xs text-gray-500'>
                          {colors.top}
                        </span>
                      </div>
                      <div className='flex flex-col items-center'>
                        <div
                          className='w-16 h-16 rounded-lg mb-2 shadow-md'
                          style={{ backgroundColor: colors.base }}
                        ></div>
                        <span className='text-xs font-medium'>Base</span>
                        <span className='text-xs text-gray-500'>
                          {colors.base}
                        </span>
                      </div>
                      <div className='flex flex-col items-center'>
                        <div
                          className='w-16 h-16 rounded-lg mb-2 shadow-md'
                          style={{ backgroundColor: colors.bottom }}
                        ></div>
                        <span className='text-xs font-medium'>Últimos 3</span>
                        <span className='text-xs text-gray-500'>
                          {colors.bottom}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='space-y-6'>
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-bold mb-4'>
                  Algoritmo de Colores por Ranking
                </h2>
                <p className='mb-4 text-gray-600'>
                  Los países se colorean según su posición en el ranking:
                </p>
                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                  <li>
                    Las <strong>3 primeras posiciones</strong> usan la variante
                    oscura del continente
                  </li>
                  <li>
                    Las <strong>3 últimas posiciones</strong> usan la variante
                    clara
                  </li>
                  <li>
                    Las <strong>posiciones intermedias</strong> usan colores
                    interpolados linealmente
                  </li>
                  <li>
                    Los países <strong>fuera del ranking</strong> usan el color
                    base
                  </li>
                </ul>

                <div className='mt-6'>
                  <h3 className='font-semibold mb-2'>
                    Ejemplo de Gradiente (América)
                  </h3>
                  <div className='h-8 w-full rounded-md overflow-hidden flex shadow-md'>
                    {Array.from({ length: 10 }).map((_, i) => {
                      const color =
                        i <= 2
                          ? CONTINENT_COLORS.América.top
                          : i >= 7
                          ? CONTINENT_COLORS.América.bottom
                          : interpolateColor(
                              CONTINENT_COLORS.América.top,
                              CONTINENT_COLORS.América.bottom,
                              (i - 2) / 5
                            );

                      return (
                        <div
                          key={i}
                          className='flex-1 h-full'
                          style={{ backgroundColor: color }}
                          title={`Posición ${i + 1}`}
                        ></div>
                      );
                    })}
                  </div>
                  <div className='flex justify-between mt-2 text-xs text-gray-600'>
                    <span>Posición 1 (Mejor)</span>
                    <span>Posición 10 (Peor)</span>
                  </div>
                </div>
              </div>

              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-bold mb-4'>Principios de Diseño</h2>
                <ul className='list-disc list-inside space-y-2 text-gray-700'>
                  <li>
                    Cada continente tiene un color base distintivo para
                    reconocimiento claro
                  </li>
                  <li>
                    La intensidad del color se correlaciona con la posición del
                    ranking
                  </li>
                  <li>
                    Esquema de colores consistente en todas las visualizaciones
                  </li>
                  <li>Colores elegidos para accesibilidad y claridad visual</li>
                  <li>
                    Fondos neutrales para que destaquen los colores de datos
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Cyan Scale */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
            <div className='bg-white rounded-lg shadow p-6'>
              <h2 className='text-xl font-bold mb-4 flex items-center'>
                <BarChart3 className='w-6 h-6 mr-2 text-cyan-600' />
                Escala de Color Cyan
              </h2>
              <p className='mb-4 text-gray-600'>
                En el modo "Escala", se utiliza una escala de colores cyan que
                va desde los valores más bajos (claro) hasta los más altos
                (oscuro).
              </p>

              <div className='space-y-4'>
                <h3 className='font-semibold'>Paleta Completa de Cyan</h3>
                <div className='grid grid-cols-6 gap-2 mb-4'>
                  {CYAN_COLOR_SCALE.map((color, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <div
                        className='w-12 h-12 rounded-lg shadow-md'
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className='text-xs mt-1 text-gray-500'>
                        {index + 1}
                      </span>
                    </div>
                  ))}
                </div>

                <h3 className='font-semibold mt-6'>
                  Escala Utilizada (5 niveles)
                </h3>
                <p className='text-sm text-gray-600 mb-3'>
                  Para mejor contraste, se utilizan solo 5 colores de la paleta
                  completa:
                </p>
                <div className='grid grid-cols-5 gap-3'>
                  {[
                    {
                      color: CYAN_COLOR_SCALE[2],
                      label: "Más Bajo",
                      range: "0-20%",
                    },
                    {
                      color: CYAN_COLOR_SCALE[4],
                      label: "Bajo",
                      range: "20-40%",
                    },
                    {
                      color: CYAN_COLOR_SCALE[6],
                      label: "Medio",
                      range: "40-60%",
                    },
                    {
                      color: CYAN_COLOR_SCALE[8],
                      label: "Alto",
                      range: "60-80%",
                    },
                    {
                      color: CYAN_COLOR_SCALE[10],
                      label: "Más Alto",
                      range: "80-100%",
                    },
                  ].map((item, index) => (
                    <div key={index} className='flex flex-col items-center'>
                      <div
                        className='w-16 h-16 rounded-lg shadow-md mb-2'
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className='text-xs font-medium text-center'>
                        {item.label}
                      </span>
                      <span className='text-xs text-gray-500 text-center'>
                        {item.range}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className='space-y-6'>
              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-bold mb-4'>
                  Cómo Funciona la Escala
                </h2>
                <ul className='list-disc list-inside space-y-3 text-gray-700'>
                  <li>
                    <strong>Normalización:</strong> Los valores se normalizan
                    entre 0 y 1 basándose en el rango mínimo y máximo de los
                    datos
                  </li>
                  <li>
                    <strong>Buckets:</strong> Los valores se dividen en 5
                    categorías (cada una representa el 20% del rango)
                  </li>
                  <li>
                    <strong>Asignación:</strong> Cada categoría recibe un color
                    específico de la escala cyan
                  </li>
                  <li>
                    <strong>Consistencia:</strong> El mismo valor siempre tendrá
                    el mismo color, independientemente del continente
                  </li>
                </ul>
              </div>

              <div className='bg-white rounded-lg shadow p-6'>
                <h2 className='text-xl font-bold mb-4'>
                  Cuándo Usar Cada Modo
                </h2>

                <div className='space-y-4'>
                  <div className='border-l-4 border-blue-500 pl-4'>
                    <h3 className='font-semibold text-blue-700'>
                      Grupos (Recomendado para)
                    </h3>
                    <ul className='text-sm text-gray-700 mt-2 space-y-1'>
                      <li>• Comparaciones entre continentes</li>
                      <li>• Análisis geográficos</li>
                      <li>• Identificación rápida de regiones</li>
                      <li>• Visualización de rankings por región</li>
                    </ul>
                  </div>

                  <div className='border-l-4 border-cyan-500 pl-4'>
                    <h3 className='font-semibold text-cyan-700'>
                      Escala (Recomendado para)
                    </h3>
                    <ul className='text-sm text-gray-700 mt-2 space-y-1'>
                      <li>• Análisis de valores absolutos</li>
                      <li>• Comparaciones cuantitativas precisas</li>
                      <li>• Identificación de patrones de intensidad</li>
                      <li>• Visualización de distribuciones de datos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Technical Implementation */}
      <div className='bg-white rounded-lg shadow p-6'>
        <h2 className='text-xl font-bold mb-4'>Implementación Técnica</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <h3 className='font-semibold mb-2'>Funciones Principales</h3>
            <ul className='text-sm text-gray-700 space-y-1'>
              <li>
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  getColorByRanking()
                </code>{" "}
                - Colores por ranking
              </li>
              <li>
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  getCyanColorByPercentile()
                </code>{" "}
                - Escala cyan
              </li>
              <li>
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  getContinentColor()
                </code>{" "}
                - Color base por continente
              </li>
            </ul>
          </div>
          <div>
            <h3 className='font-semibold mb-2'>Bibliotecas Utilizadas</h3>
            <ul className='text-sm text-gray-700 space-y-1'>
              <li>
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  d3-interpolate
                </code>{" "}
                - Interpolación de colores
              </li>
              <li>
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  Tailwind CSS
                </code>{" "}
                - Clases de utilidad
              </li>
              <li>
                <code className='bg-gray-100 px-2 py-1 rounded'>
                  Lucide React
                </code>{" "}
                - Iconos
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
