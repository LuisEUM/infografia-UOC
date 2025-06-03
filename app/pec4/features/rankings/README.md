# 🏆 Rankings Feature

**Propósito**: Clasificaciones y comparaciones entre países basadas en emisiones de CO₂

## 📊 Responsabilidades

Esta feature maneja toda la funcionalidad relacionada con:

- **Rankings dinámicos de países**
- **Comparaciones cuantitativas**
- **Selección de países para análisis**
- **Filtrado y ordenamiento avanzado**

## 🧩 Componentes

### `RankingTable.tsx`

- **Propósito**: Tabla de ranking interactiva con funcionalidades avanzadas
- **Características**:
  - Ordenamiento por múltiples criterios
  - Paginación y límites configurables
  - Selección múltiple de países
  - Filtrado por continente
  - Estados visuales (hover, seleccionado)
  - Iconos de acción (seleccionar para temporal)
  - Datos calculados (promedios, totales)

## 🔄 Interacciones con otras Features

- **Temporal**: Envía países seleccionados para análisis temporal
- **Geographic**: Sincroniza selecciones y hover states
- **Filters**: Responde a filtros de continente y variable
- **Shared**: Consume y actualiza contexto global

## 📊 Funcionalidades

### Sistema de Ranking

- Ordenamiento descendente por valor
- Posiciones numéricas
- Manejo de empates
- Filtrado por continente

### Selección de Países

- Multi-selección para análisis temporal
- Límite máximo configurable (5 países)
- Estados visuales claros
- Iconos de ojo para selección

### Información Detallada

- Banderas de países
- Valores formateados
- Continente de pertenencia
- Indicadores de cambio

## 🎨 Estados Visuales

- **Países disponibles**: Fila normal
- **Países seleccionados**: Fondo destacado
- **Hover**: Resaltado temporal
- **Sin datos**: Texto en gris
- **Límite alcanzado**: Botones deshabilitados

## 📈 Métricas de Ranking

- **CO₂ Total**: Emisiones absolutas
- **CO₂ Per Cápita**: Emisiones por habitante
- **Participación Global**: Porcentaje del total mundial
- **Ranking Personalizable**: Por cualquier métrica

## ⚙️ Configuraciones

- **Límite de resultados**: 10, 25, 50, 100
- **Países seleccionables**: Máximo 5 para temporal
- **Filtros**: Por continente y variable
- **Ordenamiento**: Múltiples columnas
