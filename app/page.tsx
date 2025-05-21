"use client";

import { useEffect, useState, useMemo } from "react";
import { useDataContext } from "./context/DataContext";
import MapChart from "./components/MapChart";
import LineChart from "./components/LineChart";
import RankingTable from "./components/RankingTable";
import FiltersPanel from "./components/FiltersPanel";
import Legend from "./components/Legend";

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
  } = useDataContext();

  // Local state for UI controls
  const [visibleContinents, setVisibleContinents] = useState<string[]>([]);

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

  // Crear título con el rango de años apropiado para mostrar en estadísticas
  const yearRangeTitle = useMemo(() => {
    if (endYear === null) {
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map and Legend (Left Panel) */}
        <div className="lg:col-span-2">
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
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Distribución Geográfica
            </h2>
            <MapChart
              data={allData}
              startYear={startYear}
              endYear={endYear}
              variable={selectedVariable}
              onCountrySelect={handleCountrySelect}
              selectedCountries={selectedCountries}
              visibleContinents={visibleContinents}
              availableContinents={availableContinents}
            />
          </div>

          {/* Leyenda a todo el ancho */}
          <div className="w-full">
            <Legend
              visibleContinents={visibleContinents}
              onToggleContinent={handleToggleContinent}
              selectedContinent={selectedContinent}
            />
          </div>
        </div>

        {/* Rankings (Right Panel) */}
        <div className="lg:col-span-1">
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
          />
        </div>
      </div>

      {/* Time Series Chart (Bottom) */}
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">
            Análisis de Series Temporales
          </h2>
          <LineChart
            data={allData}
            variable={selectedVariable}
            countries={selectedCountries}
            yearRange={[startYear, endYear || startYear]}
            onYearRangeChange={setYearRange}
            selectedYear={selectedYear}
          />
        </div>
      </div>
    </main>
  );
}
