"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  CountryData,
  DataVariable,
  loadDataset,
  getAvailableYears,
  getAvailableContinents,
} from "@/app/pec4/data/dataUtils";

// Define the context state type
interface DataContextType {
  // Data
  allData: CountryData[];
  loading: boolean;
  error: string | null;

  // Filters
  selectedVariable: DataVariable;
  setSelectedVariable: (variable: DataVariable) => void;

  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;

  selectedCountries: string[];
  setSelectedCountries: (countries: string[]) => void;
  maxSelectedCountries: number;

  // Years range
  availableYears: number[];
  yearRange: [number, number];
  setYearRange: (range: [number, number]) => void;

  startYear: number;
  setStartYear: (year: number) => void;

  endYear: number;
  setEndYear: (year: number) => void;

  selectedYear: number;
  setSelectedYear: (year: number) => void;

  // Continents
  availableContinents: string[];

  // Rankings
  rankingLimit: number;
  setRankingLimit: (limit: number) => void;

  // Map color mode
  colorMode: "multi" | "mono";
  setColorMode: (mode: "multi" | "mono") => void;

  // Helper functions
  calculateTotalForVariable: (
    variable: DataVariable,
    year: number,
    continent?: string | null
  ) => number;
  calculateAverageForVariable: (
    variable: DataVariable,
    year: number,
    continent?: string | null
  ) => number;

  // Helper functions for date ranges
  calculateTotalForVariableRange: (
    variable: DataVariable,
    startYear: number,
    endYear: number,
    continent?: string | null
  ) => number;
  calculateAverageForVariableRange: (
    variable: DataVariable,
    startYear: number,
    endYear: number,
    continent?: string | null
  ) => number;
  getCountryCountForRange: (
    startYear: number,
    endYear: number,
    continent?: string | null
  ) => number;

  // Helper function to calculate statistics filtered by visible continents
  calculateStatisticsForVisibleContinents: (
    variable: DataVariable,
    startYear: number,
    endYear: number,
    visibleContinents: string[]
  ) => { total: number; average: number; countries: number };
}

// Create the context with default values
const DataContext = createContext<DataContextType>({
  allData: [],
  loading: true,
  error: null,

  selectedVariable: "co2_per_capita",
  setSelectedVariable: () => {},

  selectedContinent: null,
  setSelectedContinent: () => {},

  selectedCountries: [],
  setSelectedCountries: () => {},
  maxSelectedCountries: 5,

  availableYears: [],
  yearRange: [1949, 2020],
  setYearRange: () => {},

  startYear: 1949,
  setStartYear: () => {},

  endYear: 2019,
  setEndYear: () => {},

  selectedYear: 2018,
  setSelectedYear: () => {},

  availableContinents: [],

  rankingLimit: 0,
  setRankingLimit: () => {},

  colorMode: "multi",
  setColorMode: () => {},

  calculateTotalForVariable: () => 0,
  calculateAverageForVariable: () => 0,
  calculateTotalForVariableRange: () => 0,
  calculateAverageForVariableRange: () => 0,
  getCountryCountForRange: () => 0,

  calculateStatisticsForVisibleContinents: () => ({
    total: 0,
    average: 0,
    countries: 0,
  }),
});

// Provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  // Data state
  const [allData, setAllData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [availableContinents, setAvailableContinents] = useState<string[]>([]);

  // Filters state
  const [selectedVariable, setSelectedVariable] =
    useState<DataVariable>("co2_per_capita");
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  // Maximum number of countries that can be selected at once
  const MAX_SELECTED_COUNTRIES = 5;

  // Custom setter for selectedCountries that enforces the maximum limit
  const handleSetSelectedCountries = (countries: string[]) => {
    // If the new selection exceeds the maximum, only take the first MAX_SELECTED_COUNTRIES
    if (countries.length > MAX_SELECTED_COUNTRIES) {
      setSelectedCountries(countries.slice(0, MAX_SELECTED_COUNTRIES));
    } else {
      setSelectedCountries(countries);
    }
  };

  // Year range state
  const [yearRange, setYearRange] = useState<[number, number]>([1949, 2020]);
  const [startYear, setStartYear] = useState<number>(1949);
  const [endYear, setEndYear] = useState<number>(2019);
  const [selectedYear, setSelectedYear] = useState<number>(2018);

  // Ranking state
  const [rankingLimit, setRankingLimit] = useState<number>(0);

  // Map color mode state
  const [colorMode, setColorMode] = useState<"multi" | "mono">("multi");

  // Load data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await loadDataset();

        // Filter out invalid entries
        const filteredData = data.filter(
          (item) => item.iso_code && item.iso_code.trim() !== ""
        );

        setAllData(filteredData);

        // Set available years and continents
        const years = getAvailableYears(filteredData);
        const continents = getAvailableContinents(filteredData);

        setAvailableYears(years);
        setAvailableContinents(continents);

        // Initialize selectedCountries as empty array - user must select countries from the ranking
        setSelectedCountries([]);

        // Set default years after identifying available years
        if (years.length > 0) {
          const maxYear = Math.max(...years);
          const minYear = Math.min(...years);
          setYearRange([minYear, maxYear]);
          setStartYear(maxYear - 5);
          setSelectedYear(maxYear);
        }

        setLoading(false);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Error al cargar los datos"
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update year range when start or end year changes
  useEffect(() => {
    if (endYear !== null && startYear <= endYear) {
      setYearRange([startYear, endYear]);
    } else {
      // Si no hay endYear, establecer el rango igual al año de inicio
      setYearRange([startYear, startYear]);
    }
  }, [startYear, endYear]);

  // Helper function to calculate total for a variable
  const calculateTotalForVariable = (
    variable: DataVariable,
    year: number,
    continent?: string | null
  ): number => {
    let filteredData = allData.filter((item) => item.year === year);

    if (continent) {
      filteredData = filteredData.filter(
        (item) => item.continent === continent
      );
    }

    return filteredData.reduce((sum, item) => {
      const value = item[variable];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);
  };

  // Helper function to calculate average for a variable
  const calculateAverageForVariable = (
    variable: DataVariable,
    year: number,
    continent?: string | null
  ): number => {
    let filteredData = allData.filter(
      (item) =>
        item.year === year &&
        item[variable] !== undefined &&
        item[variable] !== null
    );

    if (continent) {
      filteredData = filteredData.filter(
        (item) => item.continent === continent
      );
    }

    if (filteredData.length === 0) return 0;

    const total = filteredData.reduce((sum, item) => {
      const value = item[variable];
      return sum + (typeof value === "number" ? value : 0);
    }, 0);

    return total / filteredData.length;
  };

  // Helper function to calculate total for a variable using a date range
  const calculateTotalForVariableRange = (
    variable: DataVariable,
    startYear: number,
    endYear: number,
    continent?: string | null
  ): number => {
    // Filter by year range
    let filteredData: CountryData[];
    if (endYear === startYear) {
      filteredData = allData.filter((item) => item.year === startYear);
    } else {
      filteredData = allData.filter(
        (item) => item.year >= startYear && item.year <= endYear
      );
    }

    // Filter by continent if specified
    if (continent) {
      filteredData = filteredData.filter(
        (item) => item.continent === continent
      );
    }

    // Group by country to calculate average per country across the years
    const countryAverages: Record<string, { total: number; count: number }> =
      {};

    filteredData.forEach((item) => {
      const value =
        typeof item[variable] === "number" ? (item[variable] as number) : 0;

      if (!countryAverages[item.iso_code]) {
        countryAverages[item.iso_code] = { total: 0, count: 0 };
      }

      countryAverages[item.iso_code].total += value;
      countryAverages[item.iso_code].count += 1;
    });

    // Sum up the average values from all countries
    return Object.values(countryAverages).reduce((sum, country) => {
      return sum + (country.count > 0 ? country.total / country.count : 0);
    }, 0);
  };

  // Helper function to calculate average for a variable using a date range
  const calculateAverageForVariableRange = (
    variable: DataVariable,
    startYear: number,
    endYear: number,
    continent?: string | null
  ): number => {
    // Filter by year range
    let filteredData: CountryData[];
    if (endYear === startYear) {
      filteredData = allData.filter((item) => item.year === startYear);
    } else {
      filteredData = allData.filter(
        (item) => item.year >= startYear && item.year <= endYear
      );
    }

    // Filter by continent if specified
    if (continent) {
      filteredData = filteredData.filter(
        (item) => item.continent === continent
      );
    }

    // Filter out items with undefined or null values
    filteredData = filteredData.filter(
      (item) => item[variable] !== undefined && item[variable] !== null
    );

    // Group by country to calculate average per country across the years
    const countryAverages: Record<string, { total: number; count: number }> =
      {};

    filteredData.forEach((item) => {
      const value =
        typeof item[variable] === "number" ? (item[variable] as number) : 0;

      if (!countryAverages[item.iso_code]) {
        countryAverages[item.iso_code] = { total: 0, count: 0 };
      }

      countryAverages[item.iso_code].total += value;
      countryAverages[item.iso_code].count += 1;
    });

    // Calculate the total number of countries with data
    const countriesWithData = Object.values(countryAverages).filter(
      (c) => c.count > 0
    );

    if (countriesWithData.length === 0) return 0;

    // Calculate the average of averages
    const totalAvg = countriesWithData.reduce((sum, country) => {
      return sum + country.total / country.count;
    }, 0);

    return totalAvg / countriesWithData.length;
  };

  // Helper function to get the count of unique countries in a date range
  const getCountryCountForRange = (
    startYear: number,
    endYear: number,
    continent?: string | null
  ): number => {
    // Filter by year range
    let filteredData: CountryData[];
    if (endYear === startYear) {
      filteredData = allData.filter((item) => item.year === startYear);
    } else {
      filteredData = allData.filter(
        (item) => item.year >= startYear && item.year <= endYear
      );
    }

    // Filter by continent if specified
    if (continent) {
      filteredData = filteredData.filter(
        (item) => item.continent === continent
      );
    }

    // Count unique countries
    const uniqueCountries = new Set(filteredData.map((item) => item.iso_code));
    return uniqueCountries.size;
  };

  // Helper function to calculate statistics filtered by visible continents
  const calculateStatisticsForVisibleContinents = (
    variable: DataVariable,
    startYear: number,
    endYear: number,
    visibleContinents: string[]
  ) => {
    // If no continents are visible or all continents are visible, use all data
    if (
      visibleContinents.length === 0 ||
      visibleContinents.length === availableContinents.length
    ) {
      return {
        total: calculateTotalForVariableRange(variable, startYear, endYear),
        average: calculateAverageForVariableRange(variable, startYear, endYear),
        countries: getCountryCountForRange(startYear, endYear),
      };
    }

    // Filter by year range
    let filteredData: CountryData[];
    if (endYear === startYear) {
      filteredData = allData.filter((item) => item.year === startYear);
    } else {
      filteredData = allData.filter(
        (item) => item.year >= startYear && item.year <= endYear
      );
    }

    // Filter by visible continents
    filteredData = filteredData.filter((item) =>
      visibleContinents.includes(item.continent)
    );

    // Group by country to calculate average per country across the years
    const countryAverages: Record<string, { total: number; count: number }> =
      {};

    filteredData.forEach((item) => {
      const value =
        typeof item[variable] === "number" ? (item[variable] as number) : 0;

      if (!countryAverages[item.iso_code]) {
        countryAverages[item.iso_code] = { total: 0, count: 0 };
      }

      countryAverages[item.iso_code].total += value;
      countryAverages[item.iso_code].count += 1;
    });

    // Calculate total
    const total = Object.values(countryAverages).reduce((sum, country) => {
      return sum + (country.count > 0 ? country.total / country.count : 0);
    }, 0);

    // Calculate countries count
    const uniqueCountries = Object.keys(countryAverages).length;

    // Calculate average (only for countries with data)
    const countriesWithData = Object.values(countryAverages).filter(
      (c) => c.count > 0
    );

    let average = 0;
    if (countriesWithData.length > 0) {
      const totalAvg = countriesWithData.reduce((sum, country) => {
        return sum + country.total / country.count;
      }, 0);
      average = totalAvg / countriesWithData.length;
    }

    return {
      total,
      average,
      countries: uniqueCountries,
    };
  };

  // Prepare context value
  const contextValue = {
    allData,
    loading,
    error,

    selectedVariable,
    setSelectedVariable,

    selectedContinent,
    setSelectedContinent,

    selectedCountries,
    setSelectedCountries: handleSetSelectedCountries,
    maxSelectedCountries: MAX_SELECTED_COUNTRIES,

    availableYears,
    yearRange,
    setYearRange,

    startYear,
    setStartYear,

    endYear,
    setEndYear,

    selectedYear,
    setSelectedYear,

    availableContinents,

    rankingLimit,
    setRankingLimit,

    colorMode,
    setColorMode,

    calculateTotalForVariable,
    calculateAverageForVariable,
    calculateTotalForVariableRange,
    calculateAverageForVariableRange,
    getCountryCountForRange,
    calculateStatisticsForVisibleContinents,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

// Custom hook for using the context
export const useDataContext = () => useContext(DataContext);

export default DataContext;
