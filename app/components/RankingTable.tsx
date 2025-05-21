"use client";

import React, { useMemo, useState } from "react";
import {
  CountryData,
  DataVariable,
  getTopNCountries,
} from "@/app/data/dataUtils";
import { getColorByRanking } from "@/app/theme/colorUtils";

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
}: RankingTableProps) => {
  // Estado para controlar la página actual
  const [currentPage, setCurrentPage] = useState(1);

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

  // Calcular el total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(topCountries.length / ITEMS_PER_PAGE);
  }, [topCountries]);

  // Obtener los países para la página actual
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return topCountries.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [topCountries, currentPage]);

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

  // Reset página cuando cambien los filtros
  React.useEffect(() => {
    setCurrentPage(1);
  }, [variable, startYear, endYear, limit, continent, visibleContinents]);

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

  return (
    <div className="w-full overflow-hidden rounded-lg shadow">
      <div className="px-4 py-5 bg-white sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Top {limit ? limit : "de"} Países - {variableLabels[variable]}{" "}
          {yearRangeTitle}
          {getTitleText()}
        </h3>

        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {/* Contenedor de tabla con altura máxima y scroll */}
            <div className="max-h-[500px] overflow-y-auto border border-gray-200 rounded-md">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-white sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0 w-12 bg-white border-b border-gray-200"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-gray-200"
                    >
                      País
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 bg-white border-b border-gray-200"
                    >
                      Valor
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 w-1/2 bg-white border-b border-gray-200"
                    >
                      {variableLabels[variable]}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {paginatedCountries.map((country, index) => {
                    const actualIndex =
                      (currentPage - 1) * ITEMS_PER_PAGE + index;
                    const value = country.value ?? 0;
                    const percentage = (value / maxValue) * 100;
                    const isSelected = selectedCountries.includes(
                      country.iso_code
                    );
                    const barColor = getColorByRanking(
                      country.continent,
                      actualIndex + 1,
                      topCountries.length
                    );

                    return (
                      <tr
                        key={country.iso_code}
                        className={`${
                          isSelected ? "bg-blue-50" : "bg-white"
                        } cursor-pointer hover:bg-gray-50`}
                        onClick={() => onCountrySelect(country.iso_code)}
                      >
                        <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                          {actualIndex + 1}
                        </td>
                        <td className="py-4 px-3 text-sm text-gray-500 whitespace-nowrap">
                          {country.country}
                        </td>
                        <td className="py-4 px-3 text-sm text-gray-500 whitespace-nowrap">
                          {formatNumber(value)}
                        </td>
                        <td className="py-4 px-3 text-sm text-gray-500">
                          <div className="relative w-full h-6 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="absolute top-0 left-0 h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${percentage}%`,
                                backgroundColor: barColor,
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {paginatedCountries.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 px-3 text-sm text-gray-500 text-center"
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
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  Mostrando{" "}
                  {paginatedCountries.length > 0
                    ? (currentPage - 1) * ITEMS_PER_PAGE + 1
                    : 0}{" "}
                  a{" "}
                  {Math.min(currentPage * ITEMS_PER_PAGE, topCountries.length)}{" "}
                  de {topCountries.length} resultados
                </span>

                <div className="flex gap-2 items-center">
                  {/* Botón anterior */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border ${
                      currentPage === 1
                        ? "text-gray-300 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Anterior
                  </button>

                  {/* Selector de página */}
                  <div className="flex items-center">
                    <select
                      value={currentPage}
                      onChange={(e) => handlePageChange(Number(e.target.value))}
                      className="block rounded-md border border-gray-300 py-1.5 pl-3 pr-8 text-sm focus:border-blue-500 focus:ring-blue-500"
                      aria-label="Seleccionar página"
                    >
                      {Array.from({ length: totalPages }, (_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-700 ml-2">
                      de {totalPages}
                    </span>
                  </div>

                  {/* Botón siguiente */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`relative inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border ${
                      currentPage === totalPages
                        ? "text-gray-300 border-gray-200 cursor-not-allowed"
                        : "text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Siguiente
                  </button>
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
