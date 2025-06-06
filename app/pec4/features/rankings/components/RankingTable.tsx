"use client";

import React, { useMemo, useState, useRef } from "react";
import {
  CountryData,
  DataVariable,
  getTopNCountries,
} from "@/app/pec4/data/dataUtils";
import {
  getColorByRanking,
  getCyanColorByPercentile,
} from "@/app/pec4/theme/colorUtils";
import { SMALL_COUNTRIES } from "@/app/pec4/data/smallCountries";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, Search, Info } from "lucide-react";

interface RankingTableProps {
  data: CountryData[];
  variable: DataVariable;
  startYear: number;
  endYear: number | null;
  limit: number;
  onCountrySelect: (countryCode: string) => void;
  selectedCountries: string[];
  continent?: string | null;
  visibleContinents?: string[];
  onCountryHover?: (countryCode: string | null) => void;
  maxSelectedCountries?: number;
  showEyeIcons?: boolean;
  colorMode?: "multi" | "mono";
  valueRange?: { min: number; max: number };
}

const variableLabels: Record<DataVariable, string> = {
  co2: "Emisiones de CO₂ (millones de toneladas)",
  co2_per_capita: "CO₂ per cápita (toneladas)",
  share_global_co2: "Cuota de CO₂ global (%)",
  co2_per_gdp: "CO₂ por PIB",
  population: "Población",
  gdp: "PIB",
};

// Cantidad de elementos por página
const ITEMS_PER_PAGE = 10;

const RankingTable = ({
  data,
  variable,
  startYear,
  endYear,
  limit,
  onCountrySelect,
  selectedCountries,
  continent,
  visibleContinents = [],
  onCountryHover,
  maxSelectedCountries = 10,
  showEyeIcons = false,
  colorMode = "multi",
  valueRange = { min: 0, max: 100 },
}: RankingTableProps) => {
  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);
  // Estado para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  // Estado para el popover de territorio pequeño
  const [showTerritoryPopover, setShowTerritoryPopover] = useState<
    string | null
  >(null);
  // Ref para el timeout de reseteo de página
  const pageResetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Obtener los países top para el rango de años seleccionado
  const topCountries = useMemo(() => {
    // Si hay un continente específico seleccionado, solo mostrar ese
    if (continent) {
      const countries = getTopNCountries(
        data,
        variable,
        startYear,
        endYear,
        limit,
        continent
      );
      return countries.filter((country) => country.value > 0);
    }

    // Si no hay continentes visibles, no mostrar nada
    if (visibleContinents.length === 0) {
      return [];
    }

    // Si están todos los continentes visibles, no aplicar filtro de continente
    if (data.length > 0) {
      // Get all continents in the data
      const allContinents = [...new Set(data.map((item) => item.continent))];
      if (visibleContinents.length === allContinents.length) {
        const countries = getTopNCountries(
          data,
          variable,
          startYear,
          endYear,
          limit
        );
        return countries.filter((country) => country.value > 0);
      }
    }

    // Filtrar por continentes visibles
    const countries = getTopNCountries(
      data,
      variable,
      startYear,
      endYear,
      limit,
      visibleContinents
    );
    return countries.filter((country) => country.value > 0);
  }, [data, variable, startYear, endYear, limit, continent, visibleContinents]);

  // Calcular el valor máximo para escalar las barras
  const maxValue = useMemo(() => {
    if (topCountries.length === 0) return 1;
    return Math.max(...topCountries.map((country) => country.value ?? 0));
  }, [topCountries]);

  // Filtrar países por término de búsqueda
  const filteredBySearch = useMemo(() => {
    if (!searchTerm.trim()) {
      return topCountries;
    }

    const normalizedSearch = searchTerm.toLowerCase().trim();
    return topCountries.filter((country) =>
      country.country.toLowerCase().includes(normalizedSearch)
    );
  }, [topCountries, searchTerm]);

  // Calcular el total de páginas con resultados filtrados por búsqueda
  const totalPages = useMemo(() => {
    return Math.ceil(filteredBySearch.length / ITEMS_PER_PAGE);
  }, [filteredBySearch]);

  // Obtener los países para la página actual, filtrados por búsqueda
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredBySearch.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredBySearch, currentPage]);

  // Manejar cambio de página
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Crear título con el rango de años apropiado
  const yearRangeTitle = useMemo(() => {
    if (endYear === null) {
      return `(${startYear})`;
    }
    return `(${startYear}-${endYear})`;
  }, [startYear, endYear]);

  // Formato de números para España (punto como separador de miles, coma para decimales)
  const formatNumber = (value: number) => {
    return value.toLocaleString("es-ES", {
      maximumFractionDigits: 2,
    });
  };

  // Manejar hover sobre un país en la tabla
  const handleMouseEnter = (iso_code: string) => {
    if (onCountryHover) {
      onCountryHover(iso_code);
    }
  };

  // Manejar cuando el mouse sale de un país en la tabla
  const handleMouseLeave = () => {
    if (onCountryHover) {
      onCountryHover(null);
    }
  };

  // Reset página cuando cambien los filtros o la búsqueda (con debounce para searchTerm)
  React.useEffect(() => {
    // Clear any existing timeout
    if (pageResetTimeoutRef.current) {
      clearTimeout(pageResetTimeoutRef.current);
    }

    // Only reset page immediately for non-search changes
    if (searchTerm === "" || searchTerm === undefined) {
      setCurrentPage(1);
    } else {
      // For search term changes, add a small delay to prevent constant resets
      pageResetTimeoutRef.current = setTimeout(() => {
        setCurrentPage(1);
      }, 300);
    }

    // Cleanup timeout on unmount
    return () => {
      if (pageResetTimeoutRef.current) {
        clearTimeout(pageResetTimeoutRef.current);
      }
    };
  }, [
    variable,
    startYear,
    endYear,
    limit,
    continent,
    visibleContinents,
    searchTerm,
  ]);

  // Determine title text based on continent or visible continents
  const getTitleText = () => {
    if (continent) {
      return ` - ${continent}`;
    }

    if (visibleContinents.length === 0) {
      return " - Sin continentes seleccionados";
    }

    if (data.length > 0) {
      const allContinents = [...new Set(data.map((item) => item.continent))];
      if (visibleContinents.length === allContinents.length) {
        return "";
      }

      if (visibleContinents.length <= 2) {
        return ` - ${visibleContinents.join(", ")}`;
      }

      return ` - ${visibleContinents.length} continentes seleccionados`;
    }

    return "";
  };

  // Verificar si un país es demasiado pequeño para mostrarse en el mapa
  const isSmallCountry = (iso_code: string) => {
    return SMALL_COUNTRIES.includes(iso_code);
  };

  // Determine if maximum selections reached
  const isMaxSelectionsReached =
    selectedCountries.length >= maxSelectedCountries;

  // Handle country selection with limit enforcement
  const handleCountrySelect = (countryCode: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

    // If country is already selected, allow deselection
    if (selectedCountries.includes(countryCode)) {
      onCountrySelect(countryCode);
      return;
    }

    // If max not reached, allow selection
    if (!isMaxSelectionsReached) {
      onCountrySelect(countryCode);
    }
  };

  // Handle territory popover
  const handleTerritoryPopover = (countryCode: string | null) => {
    setShowTerritoryPopover(countryCode);
  };

  return (
    <div className='w-full overflow-hidden rounded-lg shadow'>
      <div className='px-4 py-5 bg-white sm:p-6'>
        <div className='flex justify-between items-center'>
          <h3 className='text-lg font-medium leading-6 text-gray-900'>
            Top {limit ? limit : "de"} Países - {variableLabels[variable]}{" "}
            {yearRangeTitle}
            {getTitleText()}
          </h3>

          {/* Counter for selected countries */}
          <div className='text-sm'>
            <span
              className={`font-medium ${
                isMaxSelectionsReached ? "text-red-600" : "text-blue-600"
              }`}
            >
              {selectedCountries.length}
            </span>
            <span className='text-gray-600'>
              /{maxSelectedCountries} países seleccionados
            </span>
          </div>
        </div>

        {/* Buscador de países */}
        <div className='mt-4 mb-4'>
          <div className='relative rounded-md shadow-sm'>
            <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
              <Search className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2 sm:text-sm border-gray-300 rounded-md'
              placeholder='Buscar país...'
            />
          </div>
        </div>

        <div className='w-full'>
          <div className='w-full'>
            {/* Contenedor de tabla con altura máxima y scroll vertical únicamente */}
            <div className='max-h-[625px] overflow-y-auto border border-gray-200 rounded-md'>
              <table className='w-full table-fixed divide-y divide-gray-300'>
                <thead className='bg-white sticky top-0 z-10 shadow-sm'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 pl-4 pr-2 text-left text-sm font-semibold text-gray-900 w-12 bg-white border-b border-gray-200'
                    >
                      #
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-2 text-left text-sm font-semibold text-gray-900 bg-white border-b border-gray-200'
                      style={{ width: showEyeIcons ? "35%" : "40%" }}
                    >
                      País
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-2 text-left text-sm font-semibold text-gray-900 bg-white border-b border-gray-200'
                      style={{ width: "15%" }}
                    >
                      Valor
                    </th>
                    <th
                      scope='col'
                      className='py-3.5 px-2 text-left text-sm font-semibold text-gray-900 bg-white border-b border-gray-200'
                      style={{ width: showEyeIcons ? "35%" : "45%" }}
                    >
                      {variable === "co2_per_capita"
                        ? "CO₂ per cápita"
                        : variable === "co2"
                        ? "Emisiones CO₂"
                        : variable === "share_global_co2"
                        ? "Cuota Global"
                        : "Variable"}
                    </th>
                    {showEyeIcons && (
                      <th
                        scope='col'
                        className='py-3.5 px-2 text-center text-sm font-semibold text-gray-900 bg-white border-b border-gray-200'
                        style={{ width: "15%" }}
                      >
                        Ver
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className='divide-y divide-gray-200 bg-white'>
                  {paginatedCountries.map((country, index) => {
                    const actualIndex =
                      (currentPage - 1) * ITEMS_PER_PAGE + index;
                    const value = country.value ?? 0;
                    const percentage = (value / maxValue) * 100;
                    const isSelected = selectedCountries.includes(
                      country.iso_code
                    );

                    // Calculate bar color based on colorMode
                    let barColor: string;
                    if (colorMode === "mono") {
                      // Use cyan scale based on value
                      barColor = getCyanColorByPercentile(
                        value,
                        valueRange.min,
                        valueRange.max
                      );
                    } else {
                      // Use continent-based ranking colors
                      barColor = getColorByRanking(
                        country.continent,
                        actualIndex + 1,
                        topCountries.length
                      );
                    }

                    const isTinyCountry = isSmallCountry(country.iso_code);

                    // Determine if this country can be selected
                    const canBeSelected = isSelected || !isMaxSelectionsReached;

                    return (
                      <tr
                        key={country.iso_code}
                        className={`${isSelected ? "bg-blue-50" : "bg-white"} ${
                          canBeSelected
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        } hover:bg-gray-50`}
                        onClick={() =>
                          canBeSelected && handleCountrySelect(country.iso_code)
                        }
                        onMouseEnter={() => handleMouseEnter(country.iso_code)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <td className='py-3 pl-4 pr-2 text-sm font-medium text-gray-900'>
                          {actualIndex + 1}
                        </td>
                        <td className='py-3 px-2 text-sm text-gray-500'>
                          <div className='flex items-center overflow-hidden'>
                            <Popover>
                              <PopoverTrigger asChild>
                                <span className='truncate mr-2 cursor-help hover:text-gray-700 transition-colors'>
                                  {country.country}
                                </span>
                              </PopoverTrigger>
                              <PopoverContent className='w-64 p-3' side='top'>
                                <div>
                                  <p className='font-medium mb-1 text-sm'>
                                    País Completo
                                  </p>
                                  <p className='text-sm text-gray-600'>
                                    {country.country}
                                  </p>
                                  <p className='text-xs text-gray-500 mt-1'>
                                    Código: {country.iso_code}
                                  </p>
                                  <p className='text-xs text-gray-500'>
                                    Continente: {country.continent}
                                  </p>
                                </div>
                              </PopoverContent>
                            </Popover>
                            {isTinyCountry && (
                              <Popover>
                                <PopoverTrigger asChild>
                                  <div
                                    className='flex-shrink-0 h-5 px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-full cursor-pointer inline-flex items-center transition-colors'
                                    title='Territorio pequeño'
                                  >
                                    <Info className='w-3 h-3' />
                                  </div>
                                </PopoverTrigger>
                                <PopoverContent className='w-64 p-3' side='top'>
                                  <div>
                                    <p className='font-medium mb-1 text-sm'>
                                      Territorio Pequeño
                                    </p>
                                    <p className='text-xs text-gray-600'>
                                      Este país o territorio es demasiado
                                      pequeño para ser visible en el mapa
                                      mundial. Los datos están disponibles pero
                                      lamentablemente no se mostrará en la
                                      visualización geográfica.
                                    </p>
                                  </div>
                                </PopoverContent>
                              </Popover>
                            )}
                          </div>
                        </td>
                        <td className='py-3 px-2 text-sm text-gray-500'>
                          <Popover>
                            <PopoverTrigger asChild>
                              <span className='truncate block cursor-help hover:text-gray-700 transition-colors'>
                                {formatNumber(value)}
                              </span>
                            </PopoverTrigger>
                            <PopoverContent className='w-64 p-3' side='top'>
                              <div>
                                <p className='font-medium mb-1 text-sm'>
                                  Valor Detallado
                                </p>
                                <p className='text-sm text-gray-600 mb-2'>
                                  <span className='font-mono'>
                                    {value.toLocaleString("es-ES", {
                                      maximumFractionDigits: 6,
                                    })}
                                  </span>
                                </p>
                                <p className='text-xs text-gray-500'>
                                  Variable: {variableLabels[variable]}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  Ranking: #{actualIndex + 1} de{" "}
                                  {topCountries.length}
                                </p>
                                <p className='text-xs text-gray-500'>
                                  Año(s):{" "}
                                  {endYear === startYear
                                    ? startYear
                                    : `${startYear}-${endYear}`}
                                </p>
                              </div>
                            </PopoverContent>
                          </Popover>
                        </td>
                        <td className='py-3 px-2 text-sm text-gray-500'>
                          <div className='relative w-full h-6 bg-gray-200 rounded-full overflow-hidden'>
                            <div
                              className='absolute top-0 left-0 h-full rounded-full transition-all duration-500'
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: barColor,
                              }}
                            ></div>
                          </div>
                        </td>
                        {showEyeIcons && (
                          <td
                            className='py-3 px-2 text-sm text-center'
                            onClick={(e) =>
                              handleCountrySelect(country.iso_code, e)
                            }
                          >
                            {isSelected ? (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className='w-5 h-5 mx-auto text-blue-600 hover:text-blue-800'
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                                />
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                strokeWidth={1.5}
                                stroke='currentColor'
                                className={`w-5 h-5 mx-auto ${
                                  canBeSelected
                                    ? "text-gray-400 hover:text-gray-600"
                                    : "text-gray-300"
                                }`}
                              >
                                <path
                                  strokeLinecap='round'
                                  strokeLinejoin='round'
                                  d='M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88'
                                />
                              </svg>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })}

                  {paginatedCountries.length === 0 && (
                    <tr>
                      <td
                        colSpan={showEyeIcons ? 5 : 4}
                        className='py-4 px-3 text-sm text-gray-500 text-center'
                      >
                        No hay datos disponibles para los criterios
                        seleccionados
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Controles de paginación */}
            {totalPages > 0 && (
              <div className='mt-4 flex justify-between items-center'>
                <span className='text-sm text-gray-700'>
                  Mostrando{" "}
                  {paginatedCountries.length > 0
                    ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                    : 0}{" "}
                  a{" "}
                  {Math.min(
                    currentPage * ITEMS_PER_PAGE,
                    filteredBySearch.length
                  )}{" "}
                  de {filteredBySearch.length} resultados
                </span>

                <div className='flex gap-2 items-center'>
                  {/* Botón anterior */}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className='h-4 w-4 mr-1' />
                    Anterior
                  </Button>

                  {/* Selector de página */}
                  <div className='flex items-center gap-2'>
                    <Select
                      value={currentPage.toString()}
                      onValueChange={(value) => handlePageChange(Number(value))}
                    >
                      <SelectTrigger className='w-20'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: totalPages }, (_, i) => (
                          <SelectItem key={i + 1} value={(i + 1).toString()}>
                            {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <span className='text-sm text-gray-700'>
                      de {totalPages}
                    </span>
                  </div>

                  {/* Botón siguiente */}
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                    <ChevronRight className='h-4 w-4 ml-1' />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingTable;
