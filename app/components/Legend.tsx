"use client";

import React from "react";
import { CONTINENT_COLORS, CYAN_COLOR_SCALE } from "@/app/theme/colorUtils";

interface LegendProps {
  visibleContinents: string[];
  onToggleContinent: (continent: string) => void;
  selectedContinent: string | null;
  colorMode: "multi" | "mono";
  onColorModeChange: (mode: "multi" | "mono") => void;
  minValue?: number;
  maxValue?: number;
  variable?: string;
}

// Helper function to format numbers (using Spanish locale)
const formatNumber = (value: number) => {
  return value.toLocaleString("es-ES", {
    maximumFractionDigits: 2,
  });
};

const Legend = ({
  visibleContinents,
  onToggleContinent,
  selectedContinent,
  colorMode,
  onColorModeChange,
  minValue = 0,
  maxValue = 100,
  variable = "",
}: LegendProps) => {
  // List of all continents
  const allContinents = Object.keys(CONTINENT_COLORS);

  // We'll use only 5 colors from the cyan scale, skipping every other one for more contrast
  const cyanColors = [
    CYAN_COLOR_SCALE[10], // Darkest (Top 20%)
    CYAN_COLOR_SCALE[8], // Dark
    CYAN_COLOR_SCALE[6], // Medium
    CYAN_COLOR_SCALE[4], // Light
    CYAN_COLOR_SCALE[2], // Lightest (Bottom 20%)
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      {/* Color Mode Toggle */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium">Modo de Colores</h3>
        <div className="flex items-center space-x-2">
          <button
            className={`px-3 py-1 rounded-l-md text-sm ${
              colorMode === "multi"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => onColorModeChange("multi")}
          >
            Varios Colores
          </button>
          <button
            className={`px-3 py-1 rounded-r-md text-sm ${
              colorMode === "mono"
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => onColorModeChange("mono")}
          >
            Un Color
          </button>
        </div>
      </div>

      <h3 className="text-sm font-medium mb-2">Continentes</h3>
      <div className="flex flex-wrap gap-2">
        {allContinents.map((continent) => {
          const isVisible = visibleContinents.includes(continent);
          const continentColor =
            CONTINENT_COLORS[continent as keyof typeof CONTINENT_COLORS].base;

          // Si hay un continente seleccionado, solo ese debe estar habilitado
          const isDisabled =
            selectedContinent !== null && continent !== selectedContinent;

          return (
            <button
              key={continent}
              className={`
                inline-flex items-center px-3 py-1 rounded-full text-sm
                ${isVisible ? "opacity-100" : "opacity-50"}
                ${
                  isDisabled
                    ? "cursor-not-allowed"
                    : "hover:opacity-100 transition-opacity duration-200"
                }
              `}
              style={{
                backgroundColor: continentColor,
                color: isColorLight(continentColor) ? "#000000" : "#FFFFFF",
              }}
              onClick={() => !isDisabled && onToggleContinent(continent)}
              disabled={isDisabled}
            >
              <span className="mr-1">{isVisible ? "✓" : "○"}</span>
              {continent}
            </button>
          );
        })}
      </div>

      {/* Multi-color legend (continent based) */}
      {colorMode === "multi" && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            Colores de Ranking por Continente
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {allContinents.map((continent) => {
              const colors =
                CONTINENT_COLORS[continent as keyof typeof CONTINENT_COLORS];
              const isVisible = visibleContinents.includes(continent);

              if (!isVisible) return null;

              return (
                <div key={continent} className="flex items-center">
                  <span className="text-xs font-medium w-16">{continent}:</span>
                  <div className="flex items-center ml-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors.top }}
                      title="Top 3"
                    ></div>
                    <span className="text-xs ml-1 mr-3">Top 3</span>

                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors.base }}
                      title="Medio"
                    ></div>
                    <span className="text-xs ml-1 mr-3">Medio</span>

                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: colors.bottom }}
                      title="Últimos 3"
                    ></div>
                    <span className="text-xs ml-1">Últimos 3</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Mono-color legend (cyan) */}
      {colorMode === "mono" && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">
            Escala de Valores (Un solo color)
          </h3>
          <div className="flex flex-col">
            {/* Range description */}
            <p className="text-xs text-gray-500 mb-3">
              Cada color representa un 20% del rango total de valores (
              {formatNumber(minValue)} - {formatNumber(maxValue)}{" "}
              {variable === "co2_per_capita"
                ? "toneladas per cápita"
                : variable === "co2"
                ? "mill. toneladas"
                : variable === "share_global_co2"
                ? "%"
                : ""}
              )
            </p>

            <div className="flex items-center justify-center">
              {cyanColors.map((color, index) => {
                // Calculate the range for this color bucket
                const bucketSize = (maxValue - minValue) / 5;
                const rangeStart = minValue + bucketSize * (4 - index); // Reversed index since darkest color (index 0) is for highest values
                const rangeEnd =
                  index === 0 ? maxValue : minValue + bucketSize * (5 - index);

                return (
                  <div key={`cyan-${index}`} className="text-center mx-2">
                    <div
                      className="w-12 h-12 rounded-md mx-auto"
                      style={{ backgroundColor: color }}
                    ></div>
                    <span className="text-xs mt-1 font-medium block">
                      {index === 0
                        ? "Muy alto"
                        : index === 1
                        ? "Alto"
                        : index === 2
                        ? "Medio"
                        : index === 3
                        ? "Bajo"
                        : "Muy bajo"}
                    </span>
                    <span className="text-xs text-gray-600 block">
                      {formatNumber(rangeStart)} - {formatNumber(rangeEnd)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to determine if a color is light or dark
function isColorLight(color: string): boolean {
  // Convert hex to RGB
  const hex = color.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Calculate luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return true if color is light (luminance > 0.5)
  return luminance > 0.5;
}

export default Legend;
