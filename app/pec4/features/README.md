# Features - Screaming Architecture

Esta aplicación está organizada usando **Screaming Architecture**, donde la estructura del código "grita" sobre qué hace el negocio, no sobre qué frameworks usa.

## 🏗️ Principios de Organización

En lugar de organizar por **tipo técnico** (components/, utils/, hooks/), organizamos por **características de dominio**:

### ❌ Organización Técnica (Antes)

```
app/
├── components/
├── context/
├── utils/
└── hooks/
```

### ✅ Organización por Dominio (Ahora)

```
app/
└── features/
    ├── geographic/      # Análisis geográfico
    ├── temporal/        # Análisis temporal
    ├── rankings/        # Rankings y comparaciones
    ├── filters/         # Sistema de filtros
    └── shared/          # Recursos compartidos
```

## 📊 Características del Dominio

### 🌍 Geographic (`features/geographic/`)

**Propósito**: Análisis y visualización geográfica de datos de emisiones

- `MapChart.tsx` - Mapa mundial interactivo
- `Legend.tsx` - Leyenda del mapa con controles de color

### 📈 Temporal (`features/temporal/`)

**Propósito**: Análisis de series temporales y tendencias

- `LineChart.tsx` - Gráfico de líneas para análisis temporal

### 🏆 Rankings (`features/rankings/`)

**Propósito**: Clasificaciones y comparaciones entre países

- `RankingTable.tsx` - Tabla de ranking con funcionalidades avanzadas

### 🔍 Filters (`features/filters/`)

**Propósito**: Sistema de filtrado y selección de datos

- `FiltersPanel.tsx` - Panel de filtros principal

### 🤝 Shared (`features/shared/`)

**Propósito**: Recursos compartidos entre características

- `DataContext.tsx` - Contexto global de datos
- Componentes UI genéricos
- Hooks compartidos
- Tipos TypeScript comunes

## 📦 Estructura Interna de cada Feature

Cada feature sigue una estructura consistente:

```
feature-name/
├── components/      # Componentes específicos de la feature
├── hooks/           # Hooks específicos de la feature
├── types/           # Tipos TypeScript específicos
├── utils/           # Utilidades específicas
├── context/         # Context específico (si necesario)
└── index.ts         # Exportaciones públicas
```

## 🚀 Beneficios

1. **Claridad de Propósito**: El código grita "soy una app de análisis de emisiones de CO₂"
2. **Cohesión Alta**: Elementos relacionados están juntos
3. **Acoplamiento Bajo**: Features independientes y reutilizables
4. **Escalabilidad**: Fácil agregar nuevas características
5. **Mantenibilidad**: Cambios localizados en cada feature

## 📋 Importaciones

### Importación Individual

```typescript
import { MapChart } from "../features/geographic";
import { LineChart } from "../features/temporal";
```

### Importación Múltiple

```typescript
import {
  MapChart,
  Legend,
  LineChart,
  RankingTable,
  FiltersPanel,
} from "../features";
```

## 🔮 Extensibilidad

Para agregar nuevas características:

1. Crear nueva carpeta en `features/`
2. Implementar la estructura interna
3. Exportar en `features/index.ts`
4. Usar desde cualquier parte de la aplicación

### Ejemplos de Futuras Features:

- `features/exports/` - Exportación de datos
- `features/comparisons/` - Comparaciones avanzadas
- `features/forecasting/` - Predicciones y pronósticos
- `features/alerts/` - Sistema de alertas y notificaciones
