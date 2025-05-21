"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { CountryData, DataVariable } from "@/app/data/dataUtils";
import {
  getContinentColor,
  getColorByRanking,
  getCyanColorByPercentile,
} from "@/app/theme/colorUtils";
import { feature } from "topojson-client";

// World map TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Mapeo entre códigos numéricos ISO y códigos alfa-3
// El TopoJSON usa códigos numéricos como id, pero nuestro dataset usa alfa-3
const ISO_NUMERIC_TO_ALPHA3: Record<string, string> = {
  "004": "AFG", // Afghanistan
  "008": "ALB", // Albania
  "012": "DZA", // Algeria
  "020": "AND", // Andorra
  "024": "AGO", // Angola
  "028": "ATG", // Antigua and Barbuda
  "031": "AZE", // Azerbaijan
  "032": "ARG", // Argentina
  "036": "AUS", // Australia
  "040": "AUT", // Austria
  "044": "BHS", // Bahamas
  "048": "BHR", // Bahrain
  "050": "BGD", // Bangladesh
  "051": "ARM", // Armenia
  "052": "BRB", // Barbados
  "056": "BEL", // Belgium
  "060": "BMU", // Bermuda
  "064": "BTN", // Bhutan
  "068": "BOL", // Bolivia
  "070": "BIH", // Bosnia and Herzegovina
  "072": "BWA", // Botswana
  "076": "BRA", // Brazil
  "084": "BLZ", // Belize
  "090": "SLB", // Solomon Islands
  "092": "VGB", // British Virgin Islands
  "096": "BRN", // Brunei
  "100": "BGR", // Bulgaria
  "104": "MMR", // Myanmar
  "108": "BDI", // Burundi
  "112": "BLR", // Belarus
  "116": "KHM", // Cambodia
  "120": "CMR", // Cameroon
  "124": "CAN", // Canada
  "132": "CPV", // Cape Verde
  "140": "CAF", // Central African Republic
  "144": "LKA", // Sri Lanka
  "148": "TCD", // Chad
  "152": "CHL", // Chile
  "156": "CHN", // China
  "158": "TWN", // Taiwan
  "162": "CXR", // Christmas Island
  "170": "COL", // Colombia
  "174": "COM", // Comoros
  "178": "COG", // Congo
  "180": "COD", // Democratic Republic of Congo
  "184": "COK", // Cook Islands
  "188": "CRI", // Costa Rica
  "191": "HRV", // Croatia
  "192": "CUB", // Cuba
  "196": "CYP", // Cyprus
  "203": "CZE", // Czechia
  "204": "BEN", // Benin
  "208": "DNK", // Denmark
  "212": "DMA", // Dominica
  "214": "DOM", // Dominican Republic
  "218": "ECU", // Ecuador
  "222": "SLV", // El Salvador
  "226": "GNQ", // Equatorial Guinea
  "231": "ETH", // Ethiopia
  "232": "ERI", // Eritrea
  "233": "EST", // Estonia
  "234": "FRO", // Faeroe Islands
  "242": "FJI", // Fiji
  "246": "FIN", // Finland
  "250": "FRA", // France
  "258": "PYF", // French Polynesia
  "262": "DJI", // Djibouti
  "266": "GAB", // Gabon
  "268": "GEO", // Georgia
  "270": "GMB", // Gambia
  "275": "PSE", // Palestine
  "276": "DEU", // Germany
  "288": "GHA", // Ghana
  "296": "KIR", // Kiribati
  "300": "GRC", // Greece
  "304": "GRL", // Greenland
  "308": "GRD", // Grenada
  "320": "GTM", // Guatemala
  "324": "GIN", // Guinea
  "328": "GUY", // Guyana
  "332": "HTI", // Haiti
  "340": "HND", // Honduras
  "344": "HKG", // Hong Kong
  "348": "HUN", // Hungary
  "352": "ISL", // Iceland
  "356": "IND", // India
  "360": "IDN", // Indonesia
  "364": "IRN", // Iran
  "368": "IRQ", // Iraq
  "372": "IRL", // Ireland
  "376": "ISR", // Israel
  "380": "ITA", // Italy
  "384": "CIV", // Cote d'Ivoire
  "388": "JAM", // Jamaica
  "392": "JPN", // Japan
  "398": "KAZ", // Kazakhstan
  "400": "JOR", // Jordan
  "404": "KEN", // Kenya
  "408": "PRK", // North Korea
  "410": "KOR", // South Korea
  "414": "KWT", // Kuwait
  "417": "KGZ", // Kyrgyzstan
  "418": "LAO", // Laos
  "422": "LBN", // Lebanon
  "426": "LSO", // Lesotho
  "428": "LVA", // Latvia
  "430": "LBR", // Liberia
  "434": "LBY", // Libya
  "438": "LIE", // Liechtenstein
  "440": "LTU", // Lithuania
  "442": "LUX", // Luxembourg
  "450": "MDG", // Madagascar
  "454": "MWI", // Malawi
  "458": "MYS", // Malaysia
  "462": "MDV", // Maldives
  "466": "MLI", // Mali
  "470": "MLT", // Malta
  "478": "MRT", // Mauritania
  "480": "MUS", // Mauritius
  "484": "MEX", // Mexico
  "496": "MNG", // Mongolia
  "498": "MDA", // Moldova
  "499": "MNE", // Montenegro
  "500": "MSR", // Montserrat
  "504": "MAR", // Morocco
  "508": "MOZ", // Mozambique
  "512": "OMN", // Oman
  "516": "NAM", // Namibia
  "520": "NRU", // Nauru
  "524": "NPL", // Nepal
  "528": "NLD", // Netherlands
  "533": "ABW", // Aruba
  "534": "SXM", // Sint Maarten (Dutch part)
  "535": "BES", // Bonaire Sint Eustatius and Saba
  "540": "NCL", // New Caledonia
  "548": "VUT", // Vanuatu
  "554": "NZL", // New Zealand
  "558": "NIC", // Nicaragua
  "562": "NER", // Niger
  "566": "NGA", // Nigeria
  "570": "NIU", // Niue
  "578": "NOR", // Norway
  "583": "FSM", // Micronesia
  "584": "MHL", // Marshall Islands
  "585": "PLW", // Palau
  "586": "PAK", // Pakistan
  "591": "PAN", // Panama
  "598": "PNG", // Papua New Guinea
  "600": "PRY", // Paraguay
  "604": "PER", // Peru
  "608": "PHL", // Philippines
  "616": "POL", // Poland
  "620": "PRT", // Portugal
  "624": "GNB", // Guinea-Bissau
  "626": "TLS", // Timor
  "630": "PRI", // Puerto Rico
  "634": "QAT", // Qatar
  "642": "ROU", // Romania
  "643": "RUS", // Russia
  "646": "RWA", // Rwanda
  "654": "SHN", // Saint Helena
  "659": "KNA", // Saint Kitts and Nevis
  "660": "AIA", // Anguilla
  "662": "LCA", // Saint Lucia
  "666": "SPM", // Saint Pierre and Miquelon
  "670": "VCT", // Saint Vincent and the Grenadines
  "678": "STP", // Sao Tome and Principe
  "682": "SAU", // Saudi Arabia
  "686": "SEN", // Senegal
  "688": "SRB", // Serbia
  "690": "SYC", // Seychelles
  "694": "SLE", // Sierra Leone
  "702": "SGP", // Singapore
  "703": "SVK", // Slovakia
  "704": "VNM", // Vietnam
  "705": "SVN", // Slovenia
  "706": "SOM", // Somalia
  "710": "ZAF", // South Africa
  "716": "ZWE", // Zimbabwe
  "724": "ESP", // España
  "728": "SSD", // South Sudan
  "729": "SDN", // Sudan
  "740": "SUR", // Suriname
  "748": "SWZ", // Eswatini
  "752": "SWE", // Sweden
  "756": "CHE", // Switzerland
  "760": "SYR", // Syria
  "762": "TJK", // Tajikistan
  "764": "THA", // Thailand
  "768": "TGO", // Togo
  "776": "TON", // Tonga
  "780": "TTO", // Trinidad and Tobago
  "784": "ARE", // United Arab Emirates
  "788": "TUN", // Tunisia
  "792": "TUR", // Turkey
  "795": "TKM", // Turkmenistan
  "796": "TCA", // Turks and Caicos Islands
  "798": "TUV", // Tuvalu
  "800": "UGA", // Uganda
  "804": "UKR", // Ukraine
  "807": "MKD", // North Macedonia
  "818": "EGY", // Egypt
  "826": "GBR", // United Kingdom
  "834": "TZA", // Tanzania
  "840": "USA", // United States
  "854": "BFA", // Burkina Faso
  "858": "URY", // Uruguay
  "860": "UZB", // Uzbekistan
  "862": "VEN", // Venezuela
  "876": "WLF", // Wallis and Futuna Islands
  "882": "WSM", // Samoa
  "887": "YEM", // Yemen
  "894": "ZMB", // Zambia
  "926": "OWID_KOS", // Kosovo
};

interface GeoGeometry {
  type: string;
  coordinates: number[][][] | number[][][][];
}

// Interfaz para la geografía del mapa
interface GeoFeature {
  type: string;
  id?: string | number;
  properties: Record<string, unknown>;
  geometry: GeoGeometry;
  rsmKey?: string;
}

// Definir tipos para los eventos del mapa
interface MapMouseEvent extends React.MouseEvent<SVGPathElement, MouseEvent> {
  clientX: number;
  clientY: number;
}

// Función para obtener el código ISO del país en formato alfa-3 a partir del mapa TopoJSON
const getCountryIsoCode = (geo: GeoFeature): string => {
  if (!geo || !geo.properties) return "";

  // Primero intenta con las propiedades directas
  if (geo.properties.ISO_A3 && typeof geo.properties.ISO_A3 === "string")
    return geo.properties.ISO_A3;
  if (geo.properties.iso_a3 && typeof geo.properties.iso_a3 === "string")
    return geo.properties.iso_a3;

  // Luego intenta con el ID numérico mapeado a alfa-3
  if (geo.id && ISO_NUMERIC_TO_ALPHA3[geo.id.toString()]) {
    return ISO_NUMERIC_TO_ALPHA3[geo.id.toString()];
  }

  // Si todo falla, devuelve un string vacío
  return "";
};

// Formato de números para España (punto como separador de miles, coma para decimales)
const formatNumber = (value: number) => {
  return value.toLocaleString("es-ES", {
    maximumFractionDigits: 2,
  });
};

interface MapChartProps {
  data: CountryData[];
  startYear: number;
  endYear: number | null;
  variable: DataVariable;
  onCountrySelect: (countryCode: string) => void;
  selectedCountries: string[];
  visibleContinents?: string[];
  availableContinents: string[];
  rankingLimit: number;
  hoveredCountry?: string | null;
  onCountryHover?: (countryCode: string | null) => void;
  colorMode: "multi" | "mono";
  onValueRangeChange?: (range: { min: number; max: number }) => void;
}

// Interface para el resultado de moveEnd
interface MapPosition {
  coordinates: [number, number];
  zoom: number;
}

const MapChart = ({
  data,
  startYear,
  endYear,
  variable,
  onCountrySelect,
  selectedCountries = [],
  visibleContinents = [],
  availableContinents,
  rankingLimit,
  hoveredCountry = null,
  onCountryHover,
  colorMode,
  onValueRangeChange,
}: MapChartProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [tooltipContent, setTooltipContent] = useState<{
    x: number;
    y: number;
    content: string;
    visible: boolean;
    countryIso: string;
  }>({ x: 0, y: 0, content: "", visible: false, countryIso: "" });

  const [mapLoaded, setMapLoaded] = useState(false);
  const [geoFeatures, setGeoFeatures] = useState<GeoFeature[]>([]);
  const [mapDataMatch, setMapDataMatch] = useState<{
    total: number;
    matched: number;
  }>({ total: 0, matched: 0 });

  // Constantes para los límites de zoom
  const MIN_ZOOM = 1; // Increase the minimum zoom level to prevent extreme zoom out
  const MAX_ZOOM = 8;

  // Estado para el zoom del mapa
  const [position, setPosition] = useState<MapPosition>({
    coordinates: [0, 30],
    zoom: MIN_ZOOM, // Start at minimum zoom (maximum zoom out)
  });

  // Función para cambiar el zoom
  const handleZoomIn = () => {
    if (position.zoom < MAX_ZOOM) {
      setPosition((pos) => ({ ...pos, zoom: pos.zoom * 1.5 }));
    }
  };

  const handleZoomOut = () => {
    if (position.zoom > MIN_ZOOM) {
      setPosition((pos) => ({ ...pos, zoom: pos.zoom / 1.5 }));
    }
  };

  const handleMoveEnd = (position: MapPosition) => {
    setPosition(position);
  };

  // Filter data by selected year range
  const filteredData = useMemo(() => {
    if (endYear === null) {
      return data.filter((d) => d.year === startYear);
    } else {
      return data.filter((d) => d.year >= startYear && d.year <= endYear);
    }
  }, [data, startYear, endYear]);

  // Create a lookup table for countries by ISO code, with averaged values for the date range
  const countryDataByCode = useMemo(() => {
    const lookup: Record<
      string,
      {
        iso_code: string;
        country: string;
        continent: string;
        count: number;
        [key: string]: string | number;
      }
    > = {};

    // Agrupar datos por país y calcular el promedio para cada variable
    filteredData.forEach((item) => {
      if (!item.iso_code) return;

      if (!lookup[item.iso_code]) {
        // Inicializar con valores por defecto
        lookup[item.iso_code] = {
          iso_code: item.iso_code,
          country: item.country,
          continent: item.continent,
          count: 0,
          [variable]: 0,
        };
      }

      // Asegurarse de que el valor sea numérico
      const numericValue =
        typeof item[variable] === "number" ? item[variable] : 0;

      // Calcular el promedio acumulativo
      const currentCount = lookup[item.iso_code].count;
      const currentValue =
        typeof lookup[item.iso_code][variable] === "number"
          ? (lookup[item.iso_code][variable] as number)
          : 0;

      const newCount = currentCount + 1;
      const newValue = (currentValue * currentCount + numericValue) / newCount;

      lookup[item.iso_code].count = newCount;
      lookup[item.iso_code][variable] = newValue;
    });

    // Filtrar países con valor 0
    const filteredLookup: typeof lookup = {};
    Object.entries(lookup).forEach(([iso, countryData]) => {
      const value =
        typeof countryData[variable] === "number"
          ? (countryData[variable] as number)
          : 0;

      if (value > 0) {
        filteredLookup[iso] = countryData;
      }
    });

    const yearRangeText =
      endYear === null ? `${startYear}` : `${startYear}-${endYear}`;

    console.log(
      `Datos disponibles para ${
        Object.keys(filteredLookup).length
      } países en el período ${yearRangeText} (excluyendo valores 0)`
    );

    return filteredLookup;
  }, [filteredData, variable, startYear, endYear]);

  // Calculate min and max values for the selected variable
  const { min, max, countriesByRank } = useMemo(() => {
    if (Object.keys(countryDataByCode).length === 0) {
      return { min: 0, max: 1, countriesByRank: {} };
    }

    let minValue = Infinity;
    let maxValue = -Infinity;

    // Obtener todos los países con datos
    const countries = Object.values(countryDataByCode);

    // Calcular min y max
    countries.forEach((country) => {
      const value =
        typeof country[variable] === "number"
          ? (country[variable] as number)
          : 0;
      if (value < minValue) minValue = value;
      if (value > maxValue) maxValue = value;
    });

    // Ordenar países por valor (de mayor a menor)
    const sortedCountries = [...countries].sort((a, b) => {
      const valueA =
        typeof a[variable] === "number" ? (a[variable] as number) : 0;
      const valueB =
        typeof b[variable] === "number" ? (b[variable] as number) : 0;
      return valueB - valueA;
    });

    // Crear un mapa de países ordenados por continente
    const countriesByContinentRank: Record<string, Record<string, number>> = {};

    // Para cada continente, crear su propio ranking
    availableContinents.forEach((continent) => {
      const continentCountries = sortedCountries.filter(
        (country) => country.continent === continent
      );

      // Asignar ranking dentro del continente
      continentCountries.forEach((country, index) => {
        if (!countriesByContinentRank[continent]) {
          countriesByContinentRank[continent] = {};
        }
        countriesByContinentRank[continent][country.iso_code] = index + 1;
      });
    });

    console.log(
      `Rango de valores para ${variable}: min=${minValue}, max=${maxValue}`
    );
    return {
      min: minValue,
      max: maxValue,
      countriesByRank: countriesByContinentRank,
    };
  }, [countryDataByCode, variable, availableContinents]);

  // Notify parent component about min/max value changes
  useEffect(() => {
    if (onValueRangeChange) {
      onValueRangeChange({ min, max });
    }
  }, [min, max, onValueRangeChange]);

  // Get top N countries for the current variable
  const topCountries = useMemo(() => {
    if (rankingLimit === 0) {
      return null; // No limit, show all countries
    }

    // Primero, agrupamos los datos por país para tener un valor promedio
    const countryValues: Record<string, { code: string; value: number }> = {};

    // Procesamos los datos para cada país
    Object.entries(countryDataByCode).forEach(([code, country]) => {
      // Solo considerar países en continentes visibles
      if (visibleContinents.length > 0 && country.continent) {
        if (!visibleContinents.includes(country.continent)) {
          return;
        }
      }

      // Obtener el valor para la variable seleccionada
      const value =
        typeof country[variable] === "number"
          ? (country[variable] as number)
          : 0;

      // Solo considerar países con valores positivos
      if (value > 0) {
        countryValues[code] = {
          code,
          value,
        };
      }
    });

    // Ordenar países por valor (mayor a menor)
    const sortedCountries = Object.values(countryValues).sort(
      (a, b) => b.value - a.value
    );

    // Tomar solo los primeros N países
    return sortedCountries
      .slice(0, rankingLimit)
      .map((country) => country.code);
  }, [countryDataByCode, rankingLimit, variable, visibleContinents]);

  // Function to determine if a country should be shown based on ranking
  const shouldShowCountry = (countryCode: string) => {
    // Si no hay límite de ranking, mostrar todos los países
    if (rankingLimit === 0 || !topCountries) {
      return true;
    }

    // Mostrar solo los países top
    return topCountries.includes(countryCode);
  };

  // Load and process map data
  useEffect(() => {
    const countryISOsInData = Object.keys(countryDataByCode);

    fetch(geoUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error cargando datos del mapa: ${response.status}`);
        }
        return response.json();
      })
      .then((topology) => {
        try {
          // Cast the result to our GeoFeature type for internal use
          const countries = feature(topology, topology.objects.countries)
            .features as unknown as GeoFeature[];
          setGeoFeatures(countries);
          setMapLoaded(true);
          console.log("Mapa cargado con", countries.length, "países");

          // Analizar cuántos países del mapa tienen correspondencia en nuestros datos
          const totalCountries = countries.length;
          let matchedCountries = 0;

          countries.forEach((geo: GeoFeature) => {
            const iso = getCountryIsoCode(geo);
            if (iso && countryISOsInData.includes(iso)) {
              matchedCountries++;
              console.log(`Match: ${geo.properties.name} (${iso})`);
            }
          });

          setMapDataMatch({ total: totalCountries, matched: matchedCountries });
          console.log(
            `Correspondencia de datos: ${matchedCountries}/${totalCountries} países (${Math.round(
              (matchedCountries / totalCountries) * 100
            )}%)`
          );
        } catch (err) {
          console.error("Error convirtiendo TopoJSON a GeoJSON:", err);
        }
      })
      .catch((error) => {
        console.error("Error cargando mapa:", error);
      });
  }, [countryDataByCode]);

  const handleCountryHover = (geo: GeoFeature, e: MapMouseEvent) => {
    if (!mapContainerRef.current) return;

    const containerRect = mapContainerRef.current.getBoundingClientRect();
    const iso = getCountryIsoCode(geo);
    const countryName =
      typeof geo.properties?.name === "string" ? geo.properties.name : "País";

    // Calcular la posición relativa al contenedor del mapa
    const x = e.clientX - containerRect.left;
    const y = e.clientY - containerRect.top;

    const countryData = iso ? countryDataByCode[iso] : null;

    if (countryData) {
      const value =
        typeof countryData[variable] === "number"
          ? (countryData[variable] as number)
          : 0;

      if (value <= 0) {
        setTooltipContent({
          x,
          y,
          content: `${countryName}: Sin emisiones registradas`,
          visible: true,
          countryIso: iso,
        });
      } else {
        setTooltipContent({
          x,
          y,
          content: `${countryName}: ${formatNumber(value)}`,
          visible: true,
          countryIso: iso,
        });
      }
    } else {
      setTooltipContent({
        x,
        y,
        content: `${countryName}: Sin datos`,
        visible: true,
        countryIso: iso,
      });
    }

    // Llamar al callback si existe
    if (onCountryHover && iso) {
      onCountryHover(iso);
    }
  };

  const handleCountryLeave = () => {
    setTooltipContent((prev) => ({ ...prev, visible: false }));

    // Llamar al callback si existe
    if (onCountryHover) {
      onCountryHover(null);
    }
  };

  // Crear título con el rango de años apropiado
  const yearRangeTitle = useMemo(() => {
    if (endYear === null) {
      return `(${startYear})`;
    }
    return `(${startYear}-${endYear})`;
  }, [startYear, endYear]);

  // If map is not loaded yet, show a loading indicator
  if (!mapLoaded) {
    return (
      <div className="h-[500px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3">Cargando mapa...</span>
      </div>
    );
  }

  return (
    <div
      ref={mapContainerRef}
      className="relative w-full h-[600px] overflow-hidden"
    >
      {/* Botones de Zoom */}
      <div className="absolute right-4 top-4 z-10 flex flex-col space-y-2">
        <button
          className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none"
          onClick={handleZoomIn}
          aria-label="Acercar"
          title="Acercar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button
          className={`bg-white p-2 rounded-full shadow-md hover:bg-gray-100 focus:outline-none ${
            position.zoom <= MIN_ZOOM ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleZoomOut}
          disabled={position.zoom <= MIN_ZOOM}
          aria-label={
            position.zoom <= MIN_ZOOM ? "Zoom mínimo alcanzado" : "Alejar"
          }
          title={position.zoom <= MIN_ZOOM ? "Zoom mínimo alcanzado" : "Alejar"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
      </div>

      {/* Título del mapa con rango de años */}
      <div className="absolute left-4 top-4 z-10">
        <h3 className="text-lg font-medium text-gray-700">
          {variableLabels[variable]} {yearRangeTitle}
          {rankingLimit > 0 && (
            <span className="ml-2 px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
              Top {rankingLimit} países
            </span>
          )}
        </h3>
      </div>

      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 120,
          center: [0, 30],
        }}
        className="w-full h-full"
      >
        <ZoomableGroup
          center={position.coordinates}
          zoom={position.zoom}
          minZoom={MIN_ZOOM}
          maxZoom={MAX_ZOOM}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoFeatures}>
            {({ geographies }) =>
              geographies.map((geo) => {
                // Cast the Geography to our GeoFeature type for internal use
                const geoFeature = geo as unknown as GeoFeature;
                const iso = getCountryIsoCode(geoFeature);
                const countryData = iso ? countryDataByCode[iso] : null;
                const isSelected = selectedCountries.includes(iso);
                const isHovered = hoveredCountry === iso;

                // Generate a unique key for each geography
                const geoKey =
                  typeof geoFeature.rsmKey === "string"
                    ? geoFeature.rsmKey
                    : typeof geoFeature.properties?.name === "string"
                    ? geoFeature.properties.name
                    : `geo-${iso || Math.random()}`;

                // Base styling
                let fillColor = "#F5F5F5"; // Default light gray for countries without data
                let fillOpacity = 0.5;

                if (countryData) {
                  // Excluir países con valor 0
                  const value =
                    typeof countryData[variable] === "number"
                      ? (countryData[variable] as number)
                      : 0;

                  if (value <= 0) {
                    // Usar estilo similar a "sin datos" para países con valor 0
                    fillColor = "#F5F5F5";
                    fillOpacity = 0.5;
                  } else {
                    // Check if continent is visible (if specified)
                    const isVisible =
                      visibleContinents.length === 0 ||
                      visibleContinents.includes(countryData.continent);

                    if (isVisible) {
                      if (colorMode === "mono") {
                        // Mono-color mode (cyan gradient)
                        fillColor = getCyanColorByPercentile(value, min, max);
                        fillOpacity = 0.9;
                      } else {
                        // Multi-color mode (continent-based colors)
                        // Get continent-specific ranking for this country
                        const continentRanking =
                          countriesByRank[countryData.continent];
                        const countryRank = continentRanking
                          ? continentRanking[iso]
                          : 0;
                        const totalCountriesInContinent = continentRanking
                          ? Object.keys(continentRanking).length
                          : 0;

                        // Use ranking-based color instead of just continent base color
                        if (countryRank && totalCountriesInContinent) {
                          fillColor = getColorByRanking(
                            countryData.continent,
                            countryRank,
                            totalCountriesInContinent
                          );
                          fillOpacity = 0.9; // Use high opacity for all ranked countries
                        } else {
                          // Fallback to continent color with opacity based on value
                          fillColor = getContinentColor(countryData.continent);

                          // Apply opacity based on the variable value
                          const normalizedValue =
                            (value - min) / (max - min || 1);
                          fillOpacity = Math.max(
                            0.3,
                            normalizedValue * 0.7 + 0.3
                          ); // Range from 0.3 to 1.0
                        }
                      }
                    } else {
                      // If continent is not visible, use a very light gray
                      fillColor = "#EEEEEE";
                      fillOpacity = 0.3;
                    }
                  }
                }

                // Si el país no está en el top N, mostrarlo en gris claro y no interactivo
                const isInTop = shouldShowCountry(iso);
                if (!isInTop) {
                  fillColor = "#EEEEEE";
                  fillOpacity = 0.3;
                }

                return (
                  <Geography
                    key={geoKey}
                    geography={geo}
                    onClick={() => isInTop && iso && onCountrySelect(iso)}
                    onMouseEnter={(e: MapMouseEvent) =>
                      isInTop ? handleCountryHover(geoFeature, e) : null
                    }
                    onMouseLeave={handleCountryLeave}
                    style={{
                      default: {
                        fill: fillColor,
                        fillOpacity: isHovered && isInTop ? 1 : fillOpacity,
                        stroke: isHovered && isInTop ? "#000000" : "#FFFFFF",
                        strokeWidth: isHovered && isInTop ? 1 : 0.5,
                        outline: "none",
                      },
                      hover: {
                        fill: !isInTop
                          ? fillColor
                          : isSelected
                          ? "#3F51B5"
                          : countryData
                          ? "#F53"
                          : "#F5F5F5",
                        fillOpacity: !isInTop ? fillOpacity : 1,
                        stroke: "#FFFFFF",
                        strokeWidth: isInTop ? 0.75 : 0.5,
                        outline: "none",
                      },
                      pressed: {
                        fill: !isInTop
                          ? fillColor
                          : isSelected
                          ? "#3F51B5"
                          : countryData
                          ? "#E42"
                          : "#C9C9C9",
                        fillOpacity: !isInTop ? fillOpacity : 1,
                        stroke: "#FFFFFF",
                        strokeWidth: isInTop ? 1 : 0.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>

      {/* Tooltip mejorado */}
      {tooltipContent.visible && (
        <div
          className="absolute z-50 px-3 py-2 text-sm bg-black bg-opacity-90 text-white rounded shadow-lg pointer-events-none"
          style={{
            left: `${tooltipContent.x}px`,
            top: `${tooltipContent.y - 45}px`,
            maxWidth: "200px",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          {tooltipContent.content}
        </div>
      )}

      {/* Información de depuración - Quitar en producción */}
      <div className="absolute bottom-2 left-2 text-xs text-gray-500">
        Correspondencia: {mapDataMatch.matched}/{mapDataMatch.total} países (
        {Math.round((mapDataMatch.matched / mapDataMatch.total) * 100 || 0)}%)
      </div>
    </div>
  );
};

// Etiquetas para las variables
const variableLabels: Record<DataVariable, string> = {
  co2: "Emisiones de CO₂ (millones de toneladas)",
  co2_per_capita: "CO₂ per cápita (toneladas)",
  share_global_co2: "Cuota de CO₂ global (%)",
  co2_per_gdp: "CO₂ por PIB",
  population: "Población",
  gdp: "PIB",
};

export default MapChart;
