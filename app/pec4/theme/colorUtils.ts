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

// Cyan color scale from Tailwind CSS
export const CYAN_COLOR_SCALE = [
  "#ecfeff", // cyan-50
  "#cffafe", // cyan-100
  "#a5f3fc", // cyan-200
  "#67e8f9", // cyan-300
  "#22d3ee", // cyan-400
  "#06b6d4", // cyan-500
  "#0891b2", // cyan-600
  "#0e7490", // cyan-700
  "#155e75", // cyan-800
  "#164e63", // cyan-900
  "#083344", // cyan-950
];

// Default color for unknown continents
export const DEFAULT_COLOR = "#CCCCCC";

/**
 * Get color based on value percentile from the cyan scale
 * @param value Current value
 * @param min Minimum value in dataset
 * @param max Maximum value in dataset
 * @returns Cyan color hex code
 */
export const getCyanColorByPercentile = (
  value: number,
  min: number,
  max: number
): string => {
  // Normalize value to 0-1 range
  const normalizedValue = (value - min) / (max - min || 1);

  // We'll use 5 color buckets (20% each)
  // Using selected colors from the CYAN_COLOR_SCALE for more contrast
  const selectedColors = [
    CYAN_COLOR_SCALE[2], // Lightest - Bottom 20%
    CYAN_COLOR_SCALE[4], // Light
    CYAN_COLOR_SCALE[6], // Medium
    CYAN_COLOR_SCALE[8], // Dark
    CYAN_COLOR_SCALE[10], // Darkest - Top 20%
  ];

  // Map normalized value to color index (0-4)
  const bucketIndex = Math.min(Math.floor(normalizedValue * 5), 4);

  return selectedColors[bucketIndex];
};

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
