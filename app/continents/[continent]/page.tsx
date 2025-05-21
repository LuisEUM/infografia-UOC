"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDataContext } from "@/app/context/DataContext";
import MapChart from "@/app/components/MapChart";
import LineChart from "@/app/components/LineChart";
import RankingTable from "@/app/components/RankingTable";
import FiltersPanel from "@/app/components/FiltersPanel";
import {
  getAvailableContinents,
  filterByContinent,
} from "@/app/data/dataUtils";
import { getContinentColor } from "@/app/theme/colorUtils";

interface ContinentPageProps {
  params: {
    continent: string;
  };
}

export default function ContinentPage({ params }: ContinentPageProps) {
  const router = useRouter();
  const {
    allData,
    loading,
    error,
    selectedVariable,
    setSelectedVariable,
    yearRange,
    setYearRange,
    selectedYear,
    setSelectedContinent,
    selectedCountries,
    setSelectedCountries,
    rankingLimit,
    setRankingLimit,
  } = useDataContext();

  const continentName = decodeURIComponent(params.continent);

  // Set the selected continent when the component mounts
  useEffect(() => {
    setSelectedContinent(continentName);

    // Cleanup when unmounting
    return () => {
      setSelectedContinent(null);
    };
  }, [continentName, setSelectedContinent]);

  // Filter data by the selected continent
  const continentData = filterByContinent(allData, continentName);
  const availableContinents = getAvailableContinents(allData);

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

  // Handle going back to the main dashboard
  const handleBackClick = () => {
    router.push("/");
  };

  // If data is loading, show loading state
  if (loading) {
    return (
      <main className="container mx-auto px-4 py-10 min-h-screen">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          <span className="ml-4 text-xl">Loading data...</span>
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

  // If continent is not valid, redirect to home
  if (
    availableContinents.length > 0 &&
    !availableContinents.includes(continentName)
  ) {
    router.push("/");
    return null;
  }

  const continentColor = getContinentColor(continentName);

  return (
    <main className="container mx-auto px-4 py-10 min-h-screen">
      <div className="mb-8">
        <button
          onClick={handleBackClick}
          className="mb-4 text-blue-600 hover:text-blue-800 flex items-center"
        >
          ← Back to Global View
        </button>

        <div className="flex items-center">
          <div
            className="w-8 h-8 rounded-full mr-3"
            style={{ backgroundColor: continentColor }}
          ></div>
          <h1 className="text-3xl font-bold mb-2">
            {continentName} CO₂ Emissions
          </h1>
        </div>

        <p className="text-gray-600 mb-2">
          Explore CO₂ emissions and related metrics for countries in{" "}
          {continentName}.
        </p>
      </div>

      {/* Filters Panel */}
      <FiltersPanel
        selectedVariable={selectedVariable}
        onVariableChange={setSelectedVariable}
        availableYears={[]} // Providing empty array as placeholder
        startYear={yearRange[0]}
        onStartYearChange={(year) => setYearRange([year, yearRange[1]])}
        endYear={yearRange[1]}
        onEndYearChange={(year) => year && setYearRange([yearRange[0], year])}
        availableContinents={availableContinents}
        selectedContinent={continentName}
        onContinentChange={(continent) => {
          if (continent && continent !== continentName) {
            router.push(`/continents/${encodeURIComponent(continent)}`);
          } else if (!continent) {
            router.push("/");
          }
        }}
        rankingLimit={rankingLimit}
        onRankingLimitChange={setRankingLimit}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map and Stats (Left Panel) */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-4 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              {continentName} Geographic Distribution
            </h2>
            <MapChart
              data={continentData}
              startYear={selectedYear}
              endYear={null}
              variable={selectedVariable}
              onCountrySelect={handleCountrySelect}
              selectedCountries={selectedCountries}
              visibleContinents={[continentName]}
              availableContinents={availableContinents}
              rankingLimit={rankingLimit}
              colorMode="multi"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold mb-4">
              Continental Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">
                  Total CO₂ Emissions
                </h3>
                <p className="text-2xl font-bold">
                  {continentData
                    .filter((d) => d.year === selectedYear)
                    .reduce((sum, d) => sum + (d.co2 || 0), 0)
                    .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-sm font-normal ml-1">
                    million tonnes
                  </span>
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">
                  Avg. CO₂ per Capita
                </h3>
                <p className="text-2xl font-bold">
                  {(
                    continentData
                      .filter((d) => d.year === selectedYear)
                      .reduce((sum, d) => sum + (d.co2_per_capita || 0), 0) /
                    continentData.filter(
                      (d) => d.year === selectedYear && d.co2_per_capita
                    ).length
                  ).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-sm font-normal ml-1">tonnes</span>
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-500">
                  Share of Global CO₂
                </h3>
                <p className="text-2xl font-bold">
                  {continentData
                    .filter((d) => d.year === selectedYear)
                    .reduce((sum, d) => sum + (d.share_global_co2 || 0), 0)
                    .toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  <span className="text-sm font-normal ml-1">%</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rankings (Right Panel) */}
        <div className="lg:col-span-1">
          <RankingTable
            data={allData}
            variable={selectedVariable}
            startYear={selectedYear}
            endYear={null}
            limit={rankingLimit}
            onCountrySelect={handleCountrySelect}
            selectedCountries={selectedCountries}
            continent={continentName}
            showEyeIcons={false}
            maxSelectedCountries={5}
            onCountryHover={() => {}}
          />
        </div>
      </div>

      {/* Time Series Chart (Bottom) */}
      <div className="mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">
            {continentName} Time Series Analysis
          </h2>
          <LineChart
            data={continentData}
            variable={selectedVariable}
            countries={selectedCountries}
            yearRange={yearRange}
            onYearRangeChange={setYearRange}
            selectedYear={selectedYear}
          />
        </div>
      </div>
    </main>
  );
}
