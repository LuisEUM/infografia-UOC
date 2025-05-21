"use client";

import { useEffect, useState, useMemo } from "react";
import { useDataContext } from "./context/DataContext";
import MapChart from "./components/MapChart";
import LineChart from "./components/LineChart";
import RankingTable from "./components/RankingTable";
import FiltersPanel from "./components/FiltersPanel";
import Legend from "./components/Legend";
import Link from "next/link";

export default function HomePage() {
  const {
    allData,
    loading,
    error,
    selectedVariable,
    setSelectedVariable,
    startYear,
    setStartYear,
    endYear,
    setEndYear,
    setYearRange,
    selectedYear,
    selectedContinent,
    setSelectedContinent,
    selectedCountries,
    setSelectedCountries,
    rankingLimit,
    setRankingLimit,
    availableContinents,
    calculateStatisticsForVisibleContinents,
    availableYears,
    maxSelectedCountries,
    colorMode,
    setColorMode,
  } = useDataContext();

  // Local state for UI controls
  const [visibleContinents, setVisibleContinents] = useState<string[]>([]);
  // Estado para el país actualmente resaltado por hover
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  // Estado para controlar la visualización activa (mapa o líneas temporales)
  const [activeView, setActiveView] = useState<"map" | "timeseries">("map");
  // Estado para almacenar los valores mínimo y máximo para la leyenda
  const [valueRange, setValueRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });

  // Initialize visible continents when data is loaded
  useEffect(() => {
    if (availableContinents.length > 0) {
      setVisibleContinents(availableContinents);
    }
  }, [availableContinents]);

  // Update visible continents when selectedContinent changes
  useEffect(() => {
    if (selectedContinent) {
      // Si hay un continente seleccionado, mostrar solo ese continente
      setVisibleContinents([selectedContinent]);
    } else {
      // Si no hay continente seleccionado, mostrar todos
      setVisibleContinents(availableContinents);
    }
  }, [selectedContinent, availableContinents]);

  // Handle country selection (toggle)
  const handleCountrySelect = (countryCode: string) => {
    // Create a new array based on current selection
    let newSelection: string[];
    if (selectedCountries.includes(countryCode)) {
      newSelection = selectedCountries.filter((c) => c !== countryCode);
    } else {
      newSelection = [...selectedCountries, countryCode];
    }
    // Update with new array directly
    setSelectedCountries(newSelection);
  };

  // Toggle continent visibility in visualizations
  const handleToggleContinent = (continent: string) => {
    // Solo permitir toggle si no hay continente específico seleccionado
    if (selectedContinent === null) {
      setVisibleContinents((prev) => {
        if (prev.includes(continent)) {
          return prev.filter((c) => c !== continent);
        } else {
          return [...prev, continent];
        }
      });
    }
  };

  // Manejar eventos de hover entre componentes
  const handleCountryHover = (countryCode: string | null) => {
    setHoveredCountry(countryCode);
  };

  // Crear título con el rango de años apropiado
  const yearRangeTitle = useMemo(() => {
    if (endYear === startYear) {
      return `(${startYear})`;
    }
    return `(${startYear}-${endYear})`;
  }, [startYear, endYear]);

  // If data is loading, show loading state
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-xl">Cargando datos...</span>
        </div>
      </main>
    );
  }

  // If there was an error loading the data, show error state
  if (error) {
    return (
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </main>
    );
  }

  // Calculate statistics based on visible continents
  const {
    total: totalValue,
    average: averageValue,
    countries: countryCount,
  } = calculateStatisticsForVisibleContinents(
    selectedVariable,
    startYear,
    endYear,
    selectedContinent ? [selectedContinent] : visibleContinents
  );

  // Formato de números para España (punto como separador de miles, coma para decimales)
  const formatNumber = (value: number) => {
    return value.toLocaleString("es-ES", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <main className="container mx-auto px-4 py-10 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Explorador de Datos de Emisiones de CO₂
        </h1>
        <p className="text-gray-600 mb-2">
          Visualiza y explora las emisiones de CO₂ y métricas relacionadas a
          través de países y períodos de tiempo.
        </p>
        <Link
          href="/documentation"
          className="text-blue-500 hover:text-blue-700 inline-flex items-center text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mr-1"
          >
            <path d="M12 9h.01M12 12h.01M12 15h.01M19 6.255a2.5 2.5 0 0 1 0 4.49m-3 8.255v-3a2 2 0 1 1 4 0v3H5v-11a2 2 0 0 1 2-2h7.5" />
          </svg>
          Ver documentación y metodología
        </Link>
      </div>

      {/* Filters Panel */}
      <FiltersPanel
        selectedVariable={selectedVariable}
        onVariableChange={setSelectedVariable}
        availableYears={loading ? [] : availableYears}
        startYear={startYear}
        onStartYearChange={setStartYear}
        endYear={endYear}
        onEndYearChange={setEndYear}
        availableContinents={availableContinents}
        selectedContinent={selectedContinent}
        onContinentChange={setSelectedContinent}
        rankingLimit={rankingLimit}
        onRankingLimitChange={setRankingLimit}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Map and Legend (Left Panel) */}
        <div className="lg:col-span-3">
          {/* Estadísticas - Movidas arriba del mapa */}
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Estadísticas {yearRangeTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">
                  {selectedContinent
                    ? `${selectedContinent}: Total`
                    : "Total Global"}
                </h3>
                <p className="text-2xl font-bold">
                  {formatNumber(totalValue)}
                  <span className="text-sm font-normal ml-1">
                    {selectedVariable === "co2"
                      ? "mill. toneladas"
                      : selectedVariable === "co2_per_capita"
                      ? "toneladas per cápita"
                      : selectedVariable === "share_global_co2"
                      ? "%"
                      : ""}
                  </span>
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">Promedio</h3>
                <p className="text-2xl font-bold">
                  {formatNumber(averageValue)}
                  <span className="text-sm font-normal ml-1">
                    {selectedVariable === "co2"
                      ? "mill. toneladas"
                      : selectedVariable === "co2_per_capita"
                      ? "toneladas"
                      : selectedVariable === "share_global_co2"
                      ? "%"
                      : ""}
                  </span>
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">
                  Países Únicos
                </h3>
                <p className="text-2xl font-bold">{countryCount}</p>
              </div>
            </div>
          </div>

          {/* Mapa */}
          <div className="bg-white rounded-lg shadow p-4 mb-6 relative">
            {/* Botones de cambio de visualización */}
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button
                onClick={() => setActiveView("map")}
                className={`flex items-center justify-center p-2 rounded-md ${
                  activeView === "map"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="Distribución Geográfica"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
                  />
                </svg>
              </button>
              <button
                onClick={() => setActiveView("timeseries")}
                className={`flex items-center justify-center p-2 rounded-md ${
                  activeView === "timeseries"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
                title="Análisis de Series Temporales"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                  />
                </svg>
              </button>
            </div>

            <h2 className="text-xl font-semibold mb-4">
              {activeView === "map"
                ? "Distribución Geográfica"
                : "Análisis de Series Temporales"}
            </h2>

            {activeView === "map" ? (
              <MapChart
                data={allData}
                startYear={startYear}
                endYear={endYear}
                variable={selectedVariable}
                onCountrySelect={handleCountrySelect}
                selectedCountries={selectedCountries}
                visibleContinents={visibleContinents}
                availableContinents={availableContinents}
                rankingLimit={rankingLimit}
                hoveredCountry={hoveredCountry}
                onCountryHover={handleCountryHover}
                colorMode={colorMode}
                onValueRangeChange={setValueRange}
              />
            ) : (
              <>
                {selectedCountries.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-16 h-16 text-cyan-400 mb-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.773ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                    <p className="text-xl font-medium text-gray-700 mb-3">
                      No hay países seleccionados
                    </p>
                    <div className="text-center max-w-md px-4">
                      <p className="text-sm text-gray-600 mb-2">
                        Para visualizar tendencias temporales, necesita
                        seleccionar países de la tabla de ranking.
                      </p>
                      <div className="text-sm font-medium mb-3">
                        <span className="text-emerald-500">S</span>
                        <span className="text-blue-500">e</span>
                        <span className="text-violet-500">l</span>
                        <span className="text-red-500">e</span>
                        <span className="text-amber-500">c</span>
                        <span className="text-emerald-500">c</span>
                        <span className="text-blue-500">i</span>
                        <span className="text-violet-500">o</span>
                        <span className="text-red-500">n</span>
                        <span className="text-amber-500">e</span> hasta{" "}
                        {maxSelectedCountries} países de la tabla usando los
                        iconos de ojo <span className="inline-block">👉</span>
                      </div>
                      {/* Color palette preview */}
                      <div className="flex justify-center space-x-2 mt-2">
                        <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <div className="w-4 h-4 rounded-full bg-violet-500"></div>
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <LineChart
                    data={allData}
                    variable={selectedVariable}
                    countries={selectedCountries}
                    yearRange={[startYear, endYear || startYear]}
                    onYearRangeChange={setYearRange}
                    selectedYear={selectedYear}
                  />
                )}
              </>
            )}
          </div>

          {/* Leyenda a todo el ancho - solo visible en vista de mapa */}
          {activeView === "map" && (
            <div className="w-full">
              <Legend
                visibleContinents={visibleContinents}
                onToggleContinent={handleToggleContinent}
                selectedContinent={selectedContinent}
                colorMode={colorMode}
                onColorModeChange={setColorMode}
                minValue={valueRange.min}
                maxValue={valueRange.max}
                variable={selectedVariable}
              />
            </div>
          )}
        </div>

        {/* Rankings (Right Panel) */}
        <div className="lg:col-span-2">
          <RankingTable
            data={allData}
            variable={selectedVariable}
            startYear={startYear}
            endYear={endYear}
            limit={rankingLimit}
            onCountrySelect={handleCountrySelect}
            selectedCountries={selectedCountries}
            continent={selectedContinent ? selectedContinent : undefined}
            visibleContinents={
              selectedContinent ? [selectedContinent] : visibleContinents
            }
            onCountryHover={handleCountryHover}
            maxSelectedCountries={maxSelectedCountries}
            showEyeIcons={activeView === "timeseries"} // Only show eye icons in time series view
          />
        </div>
      </div>
    </main>
  );
}
