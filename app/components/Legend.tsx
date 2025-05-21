"use client";

import React from "react";
import { CONTINENT_COLORS } from "@/app/theme/colorUtils";

interface LegendProps {
  visibleContinents: string[];
  onToggleContinent: (continent: string) => void;
  selectedContinent: string | null;
}

const Legend = ({
  visibleContinents,
  onToggleContinent,
  selectedContinent,
}: LegendProps) => {
  // List of all continents
  const allContinents = Object.keys(CONTINENT_COLORS);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
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
