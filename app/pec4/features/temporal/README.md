# 📈 Temporal Feature

**Propósito**: Análisis de series temporales y tendencias de emisiones de CO₂

## 📊 Responsabilidades

Esta feature maneja toda la funcionalidad relacionada con:

- **Análisis de tendencias temporales**
- **Gráficos de líneas interactivos**
- **Comparación entre países a lo largo del tiempo**
- **Visualización de cambios históricos**

## 🧩 Componentes

### `LineChart.tsx`

- **Propósito**: Gráfico de líneas para análisis temporal
- **Características**:
  - Múltiples series por país seleccionado
  - Rango de años configurable
  - Interactividad (hover, zoom, pan)
  - Paleta de colores diferenciada
  - Tooltips informativos
  - Eje Y adaptativo según la métrica
  - Manejo de datos faltantes

## 🔄 Interacciones con otras Features

- **Rankings**: Recibe países seleccionados para visualizar
- **Filters**: Usa filtros de variables y rangos de años
- **Geographic**: Sincroniza selecciones de países
- **Shared**: Consume datos del contexto global

## 📊 Funcionalidades

### Visualización Multi-País

- Hasta 5 países simultáneos
- Colores únicos por país
- Leyenda dinámica

### Controles Temporales

- Selección de rango de años
- Zoom temporal
- Navegación por períodos

### Métricas Temporales

- Evolución de CO₂ total
- Tendencias per cápita
- Cambios en participación global

## 🎨 Estados Visuales

- **Sin países**: Mensaje de instrucción
- **Cargando**: Indicador de carga
- **Datos completos**: Líneas sólidas
- **Datos parciales**: Líneas punteadas
- **Hover**: Resaltado de línea y valores

## 📈 Análisis Soportados

- **Tendencias**: Crecimiento/decrecimiento
- **Comparaciones**: Entre países y períodos
- **Patrones**: Estacionalidad y ciclos
- **Eventos**: Identificación de cambios abruptos
