import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

export async function GET() {
  try {
    // Ruta al archivo CSV
    const filePath = path.join(process.cwd(), "raw", "data.csv");

    // Leer el archivo
    const fileContent = fs.readFileSync(filePath, "utf8");

    // Parsear el CSV
    const records = parse(fileContent, {
      delimiter: ";",
      columns: true,
      skip_empty_lines: true,
    });

    // Transformar los datos para la visualización
    const transformedData = records.map((record: any) => {
      const transformed: any = { tipo: record["Tipo de vaso"] };

      // Añadir los años como propiedades numéricas
      for (let year = 2015; year <= 2022; year++) {
        transformed[year.toString()] = Number.parseInt(
          record[year.toString()],
          10
        );
      }

      return transformed;
    });

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    return NextResponse.json(
      { error: "Error al cargar los datos" },
      { status: 500 }
    );
  }
}
