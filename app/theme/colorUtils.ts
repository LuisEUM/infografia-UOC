import { interpolateRgb } from "d3-interpolate";

// Define continent base colors according to spec
export const CONTINENT_COLORS = {
  Asia: {
    base: "#FFA1A2",
    top: "#E7000B",
    bottom: "#FFE1E2",
  },
  América: {
    base: "#7BF2A7",
    top: "#00A63D",
    bottom: "#DCFCE7",
  },
  Europa: {
    base: "#DAB2FF",
    top: "#6D11B0",
    bottom: "#EDE9FE",
  },
  África: {
    base: "#F0B100",
    top: "#D18700",
    bottom: "#FEF9C2",
  },
  Oceanía: {
    base: "#8EC6FF",
    top: "#155DFC",
    bottom: "#DBEAFE",
  },
};

// Default color for unknown continents
export const DEFAULT_COLOR = "#CCCCCC";

/**
 * Get color based on continent and ranking position
 * @param continent - Continent name
 * @param rankPosition - Position in ranking (1-based index)
 * @param totalCountries - Total countries in ranking
 * @returns HEX color string
 */
export function getColorByRanking(
  continent: string,
  rankPosition: number,
  totalCountries: number
): string {
  // Get continent colors or default
  const continentColor = CONTINENT_COLORS[
    continent as keyof typeof CONTINENT_COLORS
  ] || { base: DEFAULT_COLOR, top: DEFAULT_COLOR, bottom: DEFAULT_COLOR };

  // Return base color for invalid positions
  if (rankPosition < 1 || totalCountries < 1) {
    return continentColor.base;
  }

  // Top 3 positions get top color
  if (rankPosition <= 3) {
    return continentColor.top;
  }

  // Bottom 3 positions get bottom color
  if (rankPosition > totalCountries - 3) {
    return continentColor.bottom;
  }

  // Intermediate positions get interpolated color
  const position = (rankPosition - 3) / (totalCountries - 6);
  return interpolateRgb(continentColor.top, continentColor.bottom)(position);
}

/**
 * Get base color for a continent
 * @param continent - Continent name
 * @returns HEX color string
 */
export function getContinentColor(continent: string): string {
  return (
    CONTINENT_COLORS[continent as keyof typeof CONTINENT_COLORS]?.base ||
    DEFAULT_COLOR
  );
}
