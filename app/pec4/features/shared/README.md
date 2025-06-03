# 🤝 Shared Feature

**Propósito**: Recursos compartidos entre todas las características de la aplicación

## 📊 Responsabilidades

Esta feature proporciona infraestructura común para:

- **Gestión de estado global**
- **Contexto de datos compartido**
- **Componentes UI reutilizables**
- **Hooks y utilidades comunes**
- **Tipos TypeScript globales**

## 🧩 Componentes y Recursos

### `context/DataContext.tsx`

- **Propósito**: Contexto React para gestión de estado global
- **Características**:
  - Estado centralizado de datos de emisiones
  - Estados de filtros globales
  - Funciones de cálculo y agregación
  - Loading y error states
  - Persistencia de preferencias
  - Optimización de rendimiento

## 📦 Estructura Propuesta

```
shared/
├── context/
│   └── DataContext.tsx          # Contexto principal
├── components/
│   ├── ui/                      # Componentes UI básicos
│   │   ├── Button.tsx
│   │   ├── Select.tsx
│   │   ├── Slider.tsx
│   │   └── LoadingSpinner.tsx
│   └── layout/                  # Componentes de layout
│       ├── Header.tsx
│       └── Sidebar.tsx
├── hooks/
│   ├── useLocalStorage.ts       # Persistencia local
│   ├── useDebounce.ts          # Debouncing para filtros
│   └── useAsyncData.ts         # Manejo de datos async
├── utils/
│   ├── formatters.ts           # Formateo de números/fechas
│   ├── calculations.ts         # Cálculos estadísticos
│   └── constants.ts            # Constantes globales
├── types/
│   ├── emissions.ts            # Tipos de datos de emisiones
│   ├── geography.ts            # Tipos geográficos
│   └── common.ts               # Tipos comunes
└── index.ts                    # Exportaciones públicas
```

## 🔄 Responsabilidades del Contexto

### Estado Global

```typescript
interface DataContextState {
  // Datos principales
  allData: EmissionData[];
  loading: boolean;
  error: string | null;

  // Filtros globales
  selectedVariable: Variable;
  startYear: number;
  endYear: number;
  selectedContinent: string | null;
  selectedCountries: string[];

  // Configuraciones
  rankingLimit: number;
  colorMode: ColorMode;
}
```

### Funciones Expuestas

- **setters**: Para actualizar estado
- **calculators**: Estadísticas agregadas
- **validators**: Validación de datos
- **formatters**: Formateo consistente

## 🛠️ Utilidades Compartidas

### Formateo de Datos

```typescript
// formatters.ts
export const formatNumber = (value: number, locale: string) => {...}
export const formatDate = (date: Date, format: string) => {...}
export const formatCurrency = (amount: number) => {...}
```

### Cálculos Estadísticos

```typescript
// calculations.ts
export const calculateAverage = (data: number[]) => {...}
export const calculatePercentile = (data: number[], p: number) => {...}
export const calculateTrend = (timeSeries: TimePoint[]) => {...}
```

### Constantes

```typescript
// constants.ts
export const CONTINENTS = ['Asia', 'Europe', 'Africa', ...];
export const VARIABLES = ['co2', 'co2_per_capita', ...];
export const COLOR_SCALES = {...};
```

## 🎨 Componentes UI Reutilizables

### Buttons

- Primary, Secondary, Danger
- Loading states
- Icon buttons
- Disabled states

### Form Controls

- Select dropdowns
- Range sliders
- Number inputs
- Checkboxes/toggles

### Feedback

- Loading spinners
- Error messages
- Success notifications
- Empty states

## 🔧 Hooks Compartidos

### `useLocalStorage`

- Persistencia automática
- Sincronización entre tabs
- Fallback values

### `useDebounce`

- Optimización de filtros
- Previene llamadas excesivas
- Configurable delay

### `useAsyncData`

- Manejo de estados async
- Retry automático
- Cache simple

## 🚀 Benefits de Centralización

1. **Consistencia**: UI y comportamiento uniforme
2. **Mantenibilidad**: Cambios centralizados
3. **Reutilización**: Evita duplicación de código
4. **Testing**: Testeo de utilidades comunes
5. **Performance**: Optimización compartida
