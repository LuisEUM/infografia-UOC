# 🌍 Geographic Feature

**Propósito**: Análisis y visualización geográfica de datos de emisiones de CO₂

## 📊 Responsabilidades

Esta feature maneja toda la funcionalidad relacionada con:

- **Mapas mundiales interactivos**
- **Visualización geográfica de datos**
- **Leyendas y controles de color**
- **Interacciones geográficas** (hover, click, zoom)

## 🧩 Componentes

### `MapChart.tsx`

- **Propósito**: Mapa mundial principal con datos de emisiones
- **Características**:
  - Mapa coroplético con datos por país
  - Soporte para diferentes variables (CO₂, per cápita, etc.)
  - Interactividad (hover, click, selección)
  - Modes de color (continuo, categórico)
  - Filtrado por continentes
  - Integración con ranking

### `Legend.tsx`

- **Propósito**: Leyenda interactiva del mapa
- **Características**:
  - Escala de colores dinámica
  - Toggle de continentes
  - Cambio de modo de color
  - Valores mín/máx actualizados

## 🔄 Interacciones con otras Features

- **Filters**: Recibe filtros de continentes y años
- **Rankings**: Sincroniza países seleccionados
- **Temporal**: Comparte estados de países seleccionados
- **Shared**: Usa el contexto global de datos

## 🎨 Estados Visuales

- **Países con datos**: Coloreados según escala
- **Países sin datos**: Gris claro
- **Países seleccionados**: Borde destacado
- **Países hover**: Efecto de resaltado
- **Continentes ocultos**: Transparencia

## 📈 Métricas Soportadas

- CO₂ total (millones de toneladas)
- CO₂ per cápita (toneladas/persona)
- Porcentaje del CO₂ global
- Extensible para nuevas métricas
