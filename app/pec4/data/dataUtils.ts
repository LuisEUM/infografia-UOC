// Types for our data structure
export interface CountryData {
  iso_code: string;
  country: string;
  year: number;
  co2: number;
  co2_per_capita: number;
  share_global_co2: number;
  co2_per_gdp: number;
  population: number;
  gdp: number;
  continent: string;
  [key: string]: string | number | undefined; // Para permitir propiedades adicionales como "Continent"
}

// Interfaz para datos sin normalizar
interface RawCountryData {
  iso_code?: string;
  country?: string;
  year?: number;
  co2?: number;
  co2_per_capita?: number;
  share_global_co2?: number;
  co2_per_gdp?: number;
  population?: number;
  gdp?: number;
  continent?: string;
  Continent?: string;
  [key: string]: string | number | undefined;
}

export type DataVariable =
  | "co2"
  | "co2_per_capita"
  | "share_global_co2"
  | "co2_per_gdp"
  | "population"
  | "gdp";

/**
 * Filter data by year range
 * @param data - Full dataset
 * @param startYear - Start year (inclusive)
 * @param endYear - End year (inclusive), null means only consider startYear
 * @returns Filtered dataset
 */
export function filterByYearRange(
  data: CountryData[],
  startYear: number,
  endYear: number | null
): CountryData[] {
  if (endYear === null) {
    // If endYear is null, only filter for the specific startYear
    return data.filter((item) => item.year === startYear);
  }

  return data.filter((item) => item.year >= startYear && item.year <= endYear);
}

/**
 * Filter data by continent
 * @param data - Dataset
 * @param continent - Continent name(s) to filter by
 * @returns Filtered dataset
 */
export function filterByContinent(
  data: CountryData[],
  continent: string | string[]
): CountryData[] {
  if (!continent || (Array.isArray(continent) && continent.length === 0)) {
    return data;
  }

  const continents = Array.isArray(continent) ? continent : [continent];
  return data.filter((item) => continents.includes(item.continent));
}

/**
 * Group data by continent
 * @param data - Dataset
 * @returns Object with continent keys containing related data
 */
export function groupByContinent(
  data: CountryData[]
): Record<string, CountryData[]> {
  return data.reduce((acc, item) => {
    if (!acc[item.continent]) {
      acc[item.continent] = [];
    }
    acc[item.continent].push(item);
    return acc;
  }, {} as Record<string, CountryData[]>);
}

/**
 * Get top N countries by variable for a specific year range
 * @param data - Dataset
 * @param variable - Variable to rank by
 * @param startYear - Start year (inclusive)
 * @param endYear - End year (inclusive), null means only consider startYear
 * @param limit - Number of top countries to return
 * @param continent - Optional continent filter
 * @returns Array of top N country data with aggregated values
 */
export function getTopNCountries(
  data: CountryData[],
  variable: DataVariable,
  startYear: number,
  endYear: number | null,
  limit: number = 10,
  continent?: string | string[]
): { iso_code: string; country: string; value: number; continent: string }[] {
  // Filter by year range and optionally by continent
  let filteredData: CountryData[];

  if (endYear === null) {
    // Si solo hay un año específico
    filteredData = data.filter((item) => item.year === startYear);
  } else {
    // Si hay un rango de años
    filteredData = data.filter(
      (item) => item.year >= startYear && item.year <= endYear
    );
  }

  if (continent) {
    filteredData = filterByContinent(filteredData, continent);
  }

  // Agrupar datos por país y calcular el promedio del valor para cada país
  const countryAggregates = filteredData.reduce(
    (acc, item) => {
      const value = item[variable] ?? 0;

      if (!acc[item.iso_code]) {
        acc[item.iso_code] = {
          iso_code: item.iso_code,
          country: item.country,
          totalValue: 0,
          count: 0,
          continent: item.continent,
        };
      }

      acc[item.iso_code].totalValue += value;
      acc[item.iso_code].count += 1;

      return acc;
    },
    {} as Record<
      string,
      {
        iso_code: string;
        country: string;
        totalValue: number;
        count: number;
        continent: string;
      }
    >
  );

  // Calcular el promedio y convertir a un array
  const aggregatedData = Object.values(countryAggregates).map((item) => ({
    iso_code: item.iso_code,
    country: item.country,
    value: item.totalValue / item.count, // Promedio durante el período
    continent: item.continent,
  }));

  // Ordenar por el valor promedio en orden descendente
  const sortedData = aggregatedData.sort((a, b) => b.value - a.value);

  // Devolver los N mejores resultados
  return limit > 0 ? sortedData.slice(0, limit) : sortedData;
}

/**
 * Get time series data for a country or countries
 * @param data - Dataset
 * @param countries - ISO code(s) of countries
 * @param variable - Variable to extract
 * @param startYear - Start year (inclusive)
 * @param endYear - End year (inclusive)
 * @returns Time series data by country
 */
export function getTimeSeriesData(
  data: CountryData[],
  countries: string | string[],
  variable: DataVariable,
  startYear: number,
  endYear: number
): { country: string; data: { year: number; value: number }[] }[] {
  const countryList = Array.isArray(countries) ? countries : [countries];
  const filteredData = filterByYearRange(data, startYear, endYear);

  return countryList.map((countryCode) => {
    const countryData = filteredData.filter(
      (item) => item.iso_code === countryCode
    );

    // Sort by year
    const sortedByYear = [...countryData].sort((a, b) => a.year - b.year);

    // Extract country name from first entry
    const countryName =
      sortedByYear.length > 0 ? sortedByYear[0].country : countryCode;

    return {
      country: countryName,
      data: sortedByYear.map((item) => ({
        year: item.year,
        value: item[variable] ?? 0,
      })),
    };
  });
}

/**
 * Get the min-max values for a variable across the dataset
 * @param data - Dataset
 * @param variable - Variable to analyze
 * @returns Object with min and max values
 */
export function getMinMax(
  data: CountryData[],
  variable: DataVariable
): { min: number; max: number } {
  if (data.length === 0) {
    return { min: 0, max: 0 };
  }

  let min = Infinity;
  let max = -Infinity;

  data.forEach((item) => {
    const value = item[variable] ?? 0;
    if (value < min) min = value;
    if (value > max) max = value;
  });

  return { min, max };
}

/**
 * Normaliza los datos de continente, asegurando que la propiedad 'continent' exista
 * @param data - Dataset raw
 * @returns Dataset normalizado
 */
export function normalizeData(data: RawCountryData[]): CountryData[] {
  return data.map((item) => {
    // Normalizar: si existe Continent pero no continent, copiarlo a continent
    if (item.Continent && !item.continent) {
      item.continent = item.Continent;
    }

    // Asegurarnos de que los campos requeridos existan
    return {
      iso_code: item.iso_code || "",
      country: item.country || "",
      year: item.year || 0,
      co2: item.co2 || 0,
      co2_per_capita: item.co2_per_capita || 0,
      share_global_co2: item.share_global_co2 || 0,
      co2_per_gdp: item.co2_per_gdp || 0,
      population: item.population || 0,
      gdp: item.gdp || 0,
      continent: item.continent || "",
      ...item, // Mantener otras propiedades
    } as CountryData;
  });
}

/**
 * Load the CO2 dataset
 * @returns Promise with loaded dataset
 */
export async function loadDataset(): Promise<CountryData[]> {
  const response = await fetch("/Dataset_PAC4_InfyViz_cleaned.json");
  const rawData = await response.json();
  return normalizeData(rawData);
}

/**
 * Get available years in the dataset
 * @param data - Dataset
 * @returns Array of years
 */
export function getAvailableYears(data: CountryData[]): number[] {
  const yearsSet = new Set<number>();
  data.forEach((item) => yearsSet.add(item.year));
  return Array.from(yearsSet).sort((a, b) => a - b);
}

/**
 * Get available continents in the dataset
 * @param data - Dataset
 * @returns Array of continent names
 */
export function getAvailableContinents(data: CountryData[]): string[] {
  const continentsSet = new Set<string>();
  data.forEach((item) => {
    if (item.continent) {
      continentsSet.add(item.continent);
    }
  });
  return Array.from(continentsSet).sort();
}
