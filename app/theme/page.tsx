"use client";

import React from "react";
import { CONTINENT_COLORS } from "./colorUtils";
import Link from "next/link";

export default function ThemePage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:text-blue-800 mb-6 block">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-4">Color Theme Documentation</h1>
        <p className="text-gray-600 mb-8">
          This page documents the color scheme and theme used in the CO₂
          emissions data visualization platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Continent Color Palette</h2>
          <p className="mb-4">
            Each continent has a distinct color palette with three variations:
            base color, dark (top ranking), and light (bottom ranking).
          </p>

          <div className="space-y-6">
            {Object.entries(CONTINENT_COLORS).map(([continent, colors]) => (
              <div key={continent} className="border rounded-lg p-4">
                <h3 className="font-semibold mb-2">{continent}</h3>
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-md mb-2"
                      style={{ backgroundColor: colors.top }}
                    ></div>
                    <span className="text-xs">Top ({colors.top})</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-md mb-2"
                      style={{ backgroundColor: colors.base }}
                    ></div>
                    <span className="text-xs">Base ({colors.base})</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div
                      className="w-16 h-16 rounded-md mb-2"
                      style={{ backgroundColor: colors.bottom }}
                    ></div>
                    <span className="text-xs">Bottom ({colors.bottom})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Ranking Color Algorithm</h2>
            <p className="mb-4">
              Countries are colored based on their position in the ranking:
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Top 3 positions use the darker variant of the continent color
              </li>
              <li>Bottom 3 positions use the lighter variant</li>
              <li>Positions in between use linearly interpolated colors</li>
              <li>Countries not in the rankings use the base color</li>
            </ul>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Example Gradient (América)</h3>
              <div className="h-6 w-full rounded-md overflow-hidden flex">
                {Array.from({ length: 10 }).map((_, i) => {
                  const color =
                    i <= 2
                      ? CONTINENT_COLORS.América.top
                      : i >= 7
                      ? CONTINENT_COLORS.América.bottom
                      : interpolateColor(
                          CONTINENT_COLORS.América.top,
                          CONTINENT_COLORS.América.bottom,
                          (i - 2) / 5
                        );

                  return (
                    <div
                      key={i}
                      className="flex-1 h-full"
                      style={{ backgroundColor: color }}
                    ></div>
                  );
                })}
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Rank 1</span>
                <span>Rank 10</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Design Principles</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                Each continent has a distinct base color for clear recognition
              </li>
              <li>Color intensity correlates with ranking position</li>
              <li>Consistent color scheme across all visualizations</li>
              <li>Colors chosen for accessibility and visual clarity</li>
              <li>
                Neutral backgrounds to make data visualization colors stand out
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple linear color interpolation function for the example
function interpolateColor(
  color1: string,
  color2: string,
  factor: number
): string {
  const hex1 = color1.replace("#", "");
  const hex2 = color2.replace("#", "");

  const r1 = parseInt(hex1.substring(0, 2), 16);
  const g1 = parseInt(hex1.substring(2, 4), 16);
  const b1 = parseInt(hex1.substring(4, 6), 16);

  const r2 = parseInt(hex2.substring(0, 2), 16);
  const g2 = parseInt(hex2.substring(2, 4), 16);
  const b2 = parseInt(hex2.substring(4, 6), 16);

  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));

  return `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
