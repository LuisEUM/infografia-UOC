"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/pec4/features/shared";
import { MapChart, Legend } from "@/app/pec4/features/geographic";
import { LineChart } from "@/app/pec4/features/temporal";
import { RankingTable } from "@/app/pec4/features/rankings";
import { FiltersPanel } from "@/app/pec4/features/filters";
import {
  getAvailableContinents,
  filterByContinent,
} from "@/app/pec4/data/dataUtils";
import { getContinentColor } from "@/app/pec4/theme/colorUtils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Map, BarChart3, Search } from "lucide-react";

interface ContinentClientProps {
  continent: string;
}

export function ContinentClient({ continent }: ContinentClientProps) {
  const router = useRouter();
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
    setSelectedContinent,
    selectedCountries,
    setSelectedCountries,
    rankingLimit,
    setRankingLimit,
    availableContinents,
    availableYears,
    maxSelectedCountries,
    colorMode,
    setColorMode,
  } = useDataContext();

  const continentName = continent;

  // Local state for UI controls
  const [activeView, setActiveView] = useState<"map" | "timeseries">("map");
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [valueRange, setValueRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 100,
  });

  // Set the selected continent when the component mounts
  useEffect(() => {
    setSelectedContinent(continentName);

    // Cleanup when unmounting
    return () => {
      setSelectedContinent(null);
    };
  }, [continentName, setSelectedContinent]);

  // Filter data by the selected continent
  const continentData = useMemo(() => {
    return filterByContinent(allData, continentName);
  }, [allData, continentName]);

  // Handle country selection (toggle)
  const handleCountrySelect = (countryCode: string) => {
    // Create a new array based on the current selection
    let newSelection: string[];
    if (selectedCountries.includes(countryCode)) {
      newSelection = selectedCountries.filter((c) => c !== countryCode);
    } else {
      newSelection = [...selectedCountries, countryCode];
    }
    // Update with the new array directly
    setSelectedCountries(newSelection);
  };

  // Handle continent change in filters
  const handleContinentChange = (continent: string | null) => {
    if (continent && continent !== continentName) {
      // Navigate to the new continent page
      router.push(`/pec4/routes/continents/${encodeURIComponent(continent)}`);
    } else if (!continent) {
      // Navigate back to main dashboard
      router.push("/pec4");
    }
  };

  // Handle country hover events
  const handleCountryHover = (countryCode: string | null) => {
    setHoveredCountry(countryCode);
  };

  // Calculate continent statistics
  const continentStats = useMemo(() => {
    if (!continentData.length) return { total: 0, average: 0, countries: 0 };

    // Filter by year range
    let filteredData = continentData;
    if (endYear === startYear) {
      filteredData = continentData.filter((d) => d.year === startYear);
    } else {
      filteredData = continentData.filter(
        (d) => d.year >= startYear && d.year <= endYear
      );
    }

    // Group by country to calculate average per country across the years
    const countryAverages: Record<string, { total: number; count: number }> =
      {};

    filteredData.forEach((item) => {
      const value =
        typeof item[selectedVariable] === "number"
          ? (item[selectedVariable] as number)
          : 0;

      if (!countryAverages[item.iso_code]) {
        countryAverages[item.iso_code] = { total: 0, count: 0 };
      }

      countryAverages[item.iso_code].total += value;
      countryAverages[item.iso_code].count += 1;
    });

    // Calculate total and average
    const countriesWithData = Object.values(countryAverages).filter(
      (c) => c.count > 0
    );
    const total = countriesWithData.reduce((sum, country) => {
      return sum + country.total / country.count;
    }, 0);

    const average =
      countriesWithData.length > 0
        ? countriesWithData.reduce(
            (sum, country) => sum + country.total / country.count,
            0
          ) / countriesWithData.length
        : 0;

    return {
      total,
      average,
      countries: Object.keys(countryAverages).length,
    };
  }, [continentData, selectedVariable, startYear, endYear]);

  // Create year range title
  const yearRangeTitle = useMemo(() => {
    if (endYear === startYear) {
      return `(${startYear})`;
    }
    return `(${startYear}-${endYear})`;
  }, [startYear, endYear]);

  // Format numbers for display
  const formatNumber = (value: number) => {
    return value.toLocaleString("es-ES", {
      maximumFractionDigits: 2,
    });
  };

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

  // If continent is not valid, redirect to main dashboard
  if (
    availableContinents.length > 0 &&
    !availableContinents.includes(continentName)
  ) {
    router.push("/pec4");
    return null;
  }

  const continentColor = getContinentColor(continentName);

  return (
    <main className='container mx-auto px-4 py-10 min-h-screen'>
      <div className='mb-8'>
        <div className='flex items-center'>
          <div
            className='w-8 h-8 rounded-full mr-3'
            style={{ backgroundColor: continentColor }}
          ></div>
          <h1 className='text-3xl font-bold'>
            {continentName} - Emisiones de CO₂
          </h1>
        </div>
        <p className='text-gray-600 mt-2'>
          Explora las emisiones de CO₂ y métricas relacionadas para países en{" "}
          {continentName}.
        </p>
      </div>

      {/* Filters Panel */}
      <FiltersPanel
        selectedVariable={selectedVariable}
        onVariableChange={setSelectedVariable}
        availableYears={availableYears}
        startYear={startYear}
        onStartYearChange={setStartYear}
        endYear={endYear}
        onEndYearChange={setEndYear}
        availableContinents={availableContinents}
        selectedContinent={continentName}
        onContinentChange={handleContinentChange}
        rankingLimit={rankingLimit}
        onRankingLimitChange={setRankingLimit}
      />

      {/* Statistics Panel - Full Width */}
      <div className='bg-white rounded-lg shadow p-4 mb-6'>
        <h2 className='text-xl font-semibold mb-4'>
          Estadísticas de {continentName} {yearRangeTitle}
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <div className='bg-blue-50 p-4 rounded-lg'>
            <h3 className='text-sm font-medium text-gray-500'>Total</h3>
            <p className='text-2xl font-bold'>
              {formatNumber(continentStats.total)}
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
              {formatNumber(continentStats.average)}
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
            <p className='text-2xl font-bold'>{continentStats.countries}</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-7 gap-6 mb-6'>
        {/* Map and Legend (Left Panel) */}
        <div className='lg:col-span-4'>
          {/* Map/Time Series Visualization */}
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
                  {continentName} -{" "}
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
                    data={continentData}
                    startYear={startYear}
                    endYear={endYear}
                    variable={selectedVariable}
                    onCountrySelect={handleCountrySelect}
                    selectedCountries={selectedCountries}
                    visibleContinents={[continentName]}
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
                      data={continentData}
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
              continent={continentName}
              visibleContinents={[continentName]}
              onCountryHover={handleCountryHover}
              maxSelectedCountries={maxSelectedCountries}
              showEyeIcons={activeView === "timeseries"}
              colorMode={colorMode}
              valueRange={valueRange}
            />
          </div>
        </div>
      </div>

      {/* Legend - Full Width Below - only visible in map view */}
      {activeView === "map" && (
        <div className='w-full'>
          <Legend
            visibleContinents={[continentName]}
            onToggleContinent={() => {}} // Disabled for continent view
            selectedContinent={continentName}
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
