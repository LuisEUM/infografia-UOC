"use client";

import React from "react";
import { DataVariable } from "@/app/pec4/data/dataUtils";

interface FiltersPanelProps {
  // Variable selector
  selectedVariable: DataVariable;
  onVariableChange: (variable: DataVariable) => void;

  // Year selectors
  availableYears: number[];

  startYear: number;
  onStartYearChange: (year: number) => void;

  endYear: number;
  onEndYearChange: (year: number) => void;

  // Continent/Category selector
  availableContinents: string[];
  selectedContinent: string | null;
  onContinentChange: (continent: string | null) => void;

  // Ranking selector
  rankingLimit: number;
  onRankingLimitChange: (limit: number) => void;
}

const RANKING_LIMITS = [5, 10, 20, 50, 100, 0]; // 0 means "all"

const variableOptions: { value: DataVariable; label: string }[] = [
  { value: "co2_per_capita", label: "CO₂ per cápita" },
  { value: "co2", label: "Emisiones de CO₂" },
  { value: "share_global_co2", label: "Cuota de CO₂ global" },
  { value: "co2_per_gdp", label: "CO₂ por PIB" },
  { value: "population", label: "Población" },
  { value: "gdp", label: "PIB" },
];

const FiltersPanel = ({
  selectedVariable,
  onVariableChange,
  availableYears,
  startYear,
  onStartYearChange,
  endYear,
  onEndYearChange,
  availableContinents,
  selectedContinent,
  onContinentChange,
  rankingLimit,
  onRankingLimitChange,
}: FiltersPanelProps) => {
  // Validar que los años disponibles existan
  if (!availableYears || availableYears.length === 0) {
    return <div>Cargando filtros...</div>;
  }

  // Filtrar años para evitar el año 0 en el selector
  const filteredYears = availableYears.filter((year) => year > 0);

  // Función para establecer el año inicio, actualizando otros años si es necesario
  const handleStartYearChange = (year: number) => {
    onStartYearChange(year);

    // Si hay un año de fin definido y es menor que el año de inicio, lo ajustamos
    if (endYear !== null && year > endYear) {
      onEndYearChange(year);
    }
  };

  // Función para establecer el año fin, puede ser null si no se selecciona
  const handleEndYearChange = (yearValue: string) => {
    // Si seleccionamos "No aplicar", establecemos endYear igual a startYear
    if (yearValue === "none") {
      onEndYearChange(2019);
      return;
    }

    const year = Number(yearValue);
    onEndYearChange(year);
  };

  return (
    <div className='bg-white p-4 rounded-lg shadow mb-6'>
      <h2 className='text-lg font-semibold mb-4'>Filtros</h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4'>
        {/* Variable selector */}
        <div>
          <label
            htmlFor='variable-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Variable
          </label>
          <select
            id='variable-select'
            value={selectedVariable}
            onChange={(e) => onVariableChange(e.target.value as DataVariable)}
            className='block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          >
            {variableOptions.map((option) => (
              <option key={`var-${option.value}`} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Start Year selector */}
        <div>
          <label
            htmlFor='start-year-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Año de inicio
          </label>
          <select
            id='start-year-select'
            value={startYear}
            onChange={(e) => handleStartYearChange(Number(e.target.value))}
            className='block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          >
            {filteredYears.map((year) => (
              <option key={`start-year-${year}`} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* End Year selector */}
        <div>
          <label
            htmlFor='end-year-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Año de fin
          </label>
          <select
            id='end-year-select'
            value={endYear === null ? "2019" : endYear}
            onChange={(e) => handleEndYearChange(e.target.value)}
            className='block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          >
            <option value='none'>No aplicar</option>
            {filteredYears
              .filter((year) => year >= startYear)
              .map((year) => (
                <option key={`end-year-${year}`} value={year}>
                  {year}
                </option>
              ))}
          </select>
        </div>

        {/* Categories/Continents selector */}
        <div>
          <label
            htmlFor='category-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Categoría
          </label>
          <select
            id='category-select'
            value={selectedContinent || ""}
            onChange={(e) =>
              onContinentChange(e.target.value === "" ? null : e.target.value)
            }
            className='block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          >
            <option key='all-countries' value=''>
              Todos los países del mundo
            </option>
            {availableContinents.map((continent) => (
              <option key={`continent-${continent}`} value={continent}>
                {continent}
              </option>
            ))}
          </select>
        </div>

        {/* Ranking selector - Moved to first row */}
        <div>
          <label
            htmlFor='ranking-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            Países Top
          </label>
          <select
            id='ranking-select'
            value={rankingLimit}
            onChange={(e) => onRankingLimitChange(Number(e.target.value))}
            className='block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'
          >
            {RANKING_LIMITS.map((limit) => (
              <option key={`limit-${limit}`} value={limit}>
                {limit === 0 ? "Todos" : `Top ${limit}`}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;
