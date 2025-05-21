"use client";

import React from "react";
import Link from "next/link";

export default function DocumentationPage() {
  return (
    <main className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="mb-8">
        <Link
          href="/"
          className="text-blue-500 hover:text-blue-700 flex items-center mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-1"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Volver al explorador
        </Link>

        <h1 className="text-3xl font-bold mb-4">
          Documentación: Explorador de Datos de Emisiones de CO₂
        </h1>
        <p className="text-gray-600 mb-4">
          Este documento explica la metodología de limpieza de datos y el
          proceso de desarrollo utilizado para crear esta aplicación de
          visualización de emisiones de CO₂.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          Metodología de Procesamiento de Datos
        </h2>

        <h3 className="text-lg font-medium mt-6 mb-3">
          Paso 1: Determinación de Tipos de Datos por Columna
        </h3>
        <div className="mb-6">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium">
                    Tipo de Dato
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200 text-left text-sm font-medium">
                    Campos
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-medium">
                    Campos de texto
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    iso_code, country
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-medium">
                    Campos decimales
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    co2, co2_per_capita, share_global_co2, co2_per_gdp
                  </td>
                </tr>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200 font-medium">
                    Campos enteros
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    year, population, gdp
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 className="text-lg font-medium mt-6 mb-3">
          Paso 2: Detección y Reemplazo de Valores Vacíos
        </h3>
        <div className="mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Campos decimales:</strong> Valores vacíos reemplazados por
              0.0
            </li>
            <li>
              <strong>Campos enteros:</strong> Valores vacíos reemplazados por 0
            </li>
            <li>
              <strong>Campos de texto:</strong> Valores vacíos permanecieron
              como cadenas vacías
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-medium mt-6 mb-3">
          Paso 3: Corrección de Errores en los Datos
        </h3>
        <div className="mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Se completó el nombre de país para Francia en años donde faltaba
              pero mantenía un iso_code válido
            </li>
            <li>
              Se eliminaron entidades no consideradas países: North America,
              South America, Ryukyu Islands y St. Kitts-Nevis-Anguilla
            </li>
            <li>
              Se agregó la variable "continente" para poder agrupar los valores
              por esta categoría
            </li>
            <li>
              Se eliminaron muestras falsas de países como Canadá y Venezuela
              que tenían años del 1 al 19
            </li>
            <li>
              Se añadieron códigos ISO faltantes que eran necesarios para
              trabajar con el mapa, como CAN (Canadá) y FSM (Micronesia)
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-medium mt-6 mb-3">
          Paso 4: Diseño de Visualizaciones
        </h3>
        <div className="mb-6">
          <p className="mb-3">
            Después de varias pruebas, se determinó utilizar dos tipos
            principales de visualizaciones:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Mapa de distribución geográfica:</strong> Para visualizar
              datos por país en contexto geográfico
            </li>
            <li>
              <strong>Gráfico lineal de tendencias:</strong> Para analizar la
              evolución temporal de las variables por país
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-medium mt-6 mb-3">
          Paso 5: Implementación Técnica
        </h3>
        <div className="mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>Desarrollo utilizando Next.js y publicación mediante Vercel</li>
            <li>Visualización de mapa mundial usando react-simple-maps</li>
            <li>Gráficos de tendencias implementados con ReCharts</li>
            <li>Interfaz diseñada con Tailwind CSS</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Guía de Usuario</h2>

        <h3 className="text-lg font-medium mt-4 mb-3">Vista de Mapa</h3>
        <div className="mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Selección de variable:</strong> Elija entre CO₂ total, per
              cápita, porcentaje global, o por PIB
            </li>
            <li>
              <strong>Filtros de tiempo:</strong> Seleccione años de inicio y
              fin para visualizar datos en periodos específicos
            </li>
            <li>
              <strong>Filtros por continente:</strong> Active o desactive
              continentes para filtrar los datos mostrados
            </li>
            <li>
              <strong>Modos de color:</strong> Alterne entre mapa multicolor
              (por continente) o un solo color (por valor)
            </li>
            <li>
              <strong>Límite de ranking:</strong> Filtre para mostrar solo los N
              países con mayores valores
            </li>
            <li>
              <strong>Interacción:</strong> Haga hover sobre países para ver
              información detallada y clic para seleccionar
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-medium mt-4 mb-3">Vista de Tendencias</h3>
        <div className="mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Selección de países:</strong> Elija hasta 5 países desde
              la tabla de ranking usando los iconos de ojo
            </li>
            <li>
              <strong>Visualización de tendencias:</strong> Analice la evolución
              temporal de las variables seleccionadas
            </li>
            <li>
              <strong>Paleta de colores:</strong> Cada país se muestra con un
              color distinto para facilitar la comparación
            </li>
            <li>
              <strong>Información al pasar el cursor:</strong> Obtenga valores
              precisos para cada año al hacer hover
            </li>
          </ul>
        </div>

        <h3 className="text-lg font-medium mt-4 mb-3">Panel de Estadísticas</h3>
        <div className="mb-6">
          <p className="mb-3">Las estadísticas muestran:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Total:</strong> Suma de los valores para los
              países/continentes seleccionados
            </li>
            <li>
              <strong>Promedio:</strong> Media de los valores para los
              países/continentes seleccionados
            </li>
            <li>
              <strong>Países únicos:</strong> Número de países con datos
              disponibles para los filtros aplicados
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">
          Decisiones de Implementación
        </h2>

        <h3 className="text-lg font-medium mt-4 mb-3">
          Tecnologías Utilizadas
        </h3>
        <div className="mb-6">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Frontend:</strong> React, Next.js, TypeScript
            </li>
            <li>
              <strong>Visualización:</strong> react-simple-maps, ReCharts
            </li>
            <li>
              <strong>Estilos:</strong> Tailwind CSS
            </li>
            <li>
              <strong>Gestión de Estado:</strong> React Context API
            </li>
            <li>
              <strong>Despliegue:</strong> Vercel
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Volver al explorador de datos
        </Link>
      </div>
    </main>
  );
}
