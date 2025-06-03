"use client";

import { useEffect, useState, useMemo } from "react";
import { useDataContext } from "./features/shared";
import { MapChart, Legend } from "./features/geographic";
import { LineChart } from "./features/temporal";
import { RankingTable } from "./features/rankings";
import { FiltersPanel } from "./features/filters";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Map, BarChart3, Search, Info } from "lucide-react";
import Link from "next/link";

export default function PEC4Page() {
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
      <main className='container mx-auto px-4 py-10 min-h-screen'>
        <div className='flex items-center justify-center h-64'>
          <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500'></div>
          <span className='ml-4 text-xl'>Cargando datos...</span>
        </div>
      </main>
    );
  }

  // If there was an error loading the data, show error state
  if (error) {
    return (
      <main className='container mx-auto px-4 py-10 min-h-screen'>
        <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative'>
          <strong className='font-bold'>Error: </strong>
          <span className='block sm:inline'>{error}</span>
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
    <main className='container mx-auto px-4 py-10 min-h-screen'>
      <div className='mb-8'>
        <div className='flex items-center mb-2'>
          <span className='bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full mr-3'>
            PEC 4
          </span>
          <h1 className='text-3xl font-bold'>
            Explorador de Datos de Emisiones de CO₂
          </h1>
        </div>
        <p className='text-gray-600 mb-2'>
          Visualiza y explora las emisiones de CO₂ y métricas relacionadas a
          través de países y períodos de tiempo.
        </p>
        <Button variant='link' asChild className='p-0 h-auto'>
          <Link
            href='/pec4/documentation'
            className='text-blue-500 hover:text-blue-700 inline-flex items-center text-sm'
          >
            <Info className='w-4 h-4 mr-1' />
            Ver documentación y metodología
          </Link>
        </Button>
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

      {/* Statistics - Full Width */}
      <div className='bg-white rounded-lg shadow p-4 mb-6'>
        <h2 className='text-xl font-semibold mb-4'>
          Estadísticas {yearRangeTitle}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-gray-500'>
              {selectedContinent
                ? `${selectedContinent}: Total`
                : "Total Global"}
            </h3>
            <p className='text-2xl font-bold'>
              {formatNumber(totalValue)}
              <span className='text-sm font-normal ml-1'>
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
          <div className='bg-green-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-gray-500'>Promedio</h3>
            <p className='text-2xl font-bold'>
              {formatNumber(averageValue)}
              <span className='text-sm font-normal ml-1'>
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
          <div className='bg-purple-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-gray-500'>Países Únicos</h3>
            <p className='text-2xl font-bold'>{countryCount}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6'>
        {/* Map and Visualization (Left Panel) */}
        <div className='lg:col-span-4'>
          {/* Visualización Principal */}
          <div className='bg-white rounded-lg shadow p-4 h-full flex flex-col'>
            <Tabs
              value={activeView}
              onValueChange={(value) =>
                setActiveView(value as "map" | "timeseries")
              }
              className='flex-1 flex flex-col'
            >
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-semibold'>
                  {activeView === "map"
                    ? "Distribución Geográfica"
                    : "Análisis de Series Temporales"}
                </h2>
                <TabsList className='grid w-fit grid-cols-2'>
                  <TabsTrigger value='map' className='flex items-center gap-2'>
                    <Map className='w-4 h-4' />
                    Mapa
                  </TabsTrigger>
                  <TabsTrigger
                    value='timeseries'
                    className='flex items-center gap-2'
                  >
                    <BarChart3 className='w-4 h-4' />
                    Series
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value='map' className='mt-0 flex-1'>
                <div className='h-full min-h-[600px]'>
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
                </div>
              </TabsContent>

              <TabsContent value='timeseries' className='mt-0 flex-1'>
                <div className='h-full min-h-[600px]'>
                  {selectedCountries.length === 0 ? (
                    <div className='flex flex-col items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed border-gray-300'>
                      <Search className='w-16 h-16 text-cyan-400 mb-4' />
                      <p className='text-xl font-medium text-gray-700 mb-3'>
                        No hay países seleccionados
                      </p>
                      <div className='text-center max-w-md px-4'>
                        <p className='text-sm text-gray-600 mb-2'>
                          Para visualizar tendencias temporales, necesita
                          seleccionar países de la tabla de ranking.
                        </p>
                        <div className='text-sm font-medium mb-3'>
                          <span className='text-emerald-500'>S</span>
                          <span className='text-blue-500'>e</span>
                          <span className='text-violet-500'>l</span>
                          <span className='text-red-500'>e</span>
                          <span className='text-amber-500'>c</span>
                          <span className='text-emerald-500'>c</span>
                          <span className='text-blue-500'>i</span>
                          <span className='text-violet-500'>o</span>
                          <span className='text-red-500'>n</span>
                          <span className='text-amber-500'>e</span> hasta{" "}
                          {maxSelectedCountries} países de la tabla usando los
                          iconos de ojo <span className='inline-block'>👉</span>
                        </div>
                        {/* Color palette preview */}
                        <div className='flex justify-center space-x-2 mt-2'>
                          <div className='w-4 h-4 rounded-full bg-emerald-500'></div>
                          <div className='w-4 h-4 rounded-full bg-blue-500'></div>
                          <div className='w-4 h-4 rounded-full bg-violet-500'></div>
                          <div className='w-4 h-4 rounded-full bg-red-500'></div>
                          <div className='w-4 h-4 rounded-full bg-amber-500'></div>
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
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Rankings (Right Panel) - Now Wider */}
        <div className='lg:col-span-3'>
          <div className='h-full'>
            <RankingTable
              data={allData}
              variable={selectedVariable}
              startYear={startYear}
              endYear={endYear}
              limit={rankingLimit}
              onCountrySelect={handleCountrySelect}
              selectedCountries={selectedCountries}
              visibleContinents={visibleContinents}
              onCountryHover={handleCountryHover}
              maxSelectedCountries={maxSelectedCountries}
              showEyeIcons={activeView === "timeseries"}
              colorMode={colorMode}
              valueRange={valueRange}
            />
          </div>
        </div>
      </div>

      {/* Legend - Full Width Below - Only visible in map view */}
      {activeView === "map" && (
        <div className='w-full'>
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
    </main>
  );
}
