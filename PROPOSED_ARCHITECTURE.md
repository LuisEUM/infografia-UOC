# 🏗️ Arquitectura Escalable Propuesta

## 📋 Problema Actual

La estructura actual mezcla recursos específicos de PEC 4 con elementos compartidos:

### ❌ Estructura Actual (Problemática)

```
app/
├── features/            # ¿Son de PEC 4 o compartidos?
├── data/               # Específicos de CO₂ (PEC 4)
├── theme/              # Específicos de CO₂ (PEC 4)
├── continents/         # Específicos de CO₂ (PEC 4)
├── documentation/      # Específicos de CO₂ (PEC 4)
├── pec3/              # Solo page.tsx placeholder
├── pec4/              # Solo page.tsx
└── practica/          # Solo page.tsx placeholder
```

## ✅ Nueva Arquitectura Escalable

### 🎯 Principios de Organización

1. **Separación por PEC**: Cada PEC tiene su propia carpeta completa
2. **Recursos Compartidos**: Solo lo verdaderamente reutilizable
3. **Componentes por Página**: Estructura clara de componentes
4. **Escalabilidad**: Fácil agregar PEC 5, 6, etc.

### 📁 Estructura Propuesta

```
app/
├── layout.tsx                    # Layout global
├── page.tsx                      # Página índice del portfolio
├── globals.css                   # Estilos globales
├── favicon.ico                   # Assets globales
├──
├── shared/                       # 🤝 RECURSOS COMPARTIDOS
│   ├── components/
│   │   ├── ui/                  # Componentes UI básicos
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   └── portfolio/           # Componentes del portfolio
│   │       ├── ProjectCard.tsx
│   │       ├── NavigationButton.tsx
│   │       └── index.ts
│   ├── hooks/                   # Hooks reutilizables
│   │   ├── useLocalStorage.ts
│   │   ├── useDebounce.ts
│   │   └── index.ts
│   ├── utils/                   # Utilidades globales
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── index.ts
│   ├── types/                   # Tipos compartidos
│   │   ├── common.ts
│   │   ├── portfolio.ts
│   │   └── index.ts
│   └── constants/               # Constantes globales
│       ├── routes.ts
│       ├── themes.ts
│       └── index.ts
├──
├── pec3/                        # 🔍 PEC 3 - Rediseño de mala práctica
│   ├── page.tsx                 # Página principal
│   ├── components/              # Componentes específicos de PEC 3
│   │   ├── analysis/
│   │   │   ├── BadPracticeAnalysis.tsx
│   │   │   ├── ComparisonView.tsx
│   │   │   └── index.ts
│   │   ├── redesign/
│   │   │   ├── ImprovedDesign.tsx
│   │   │   ├── DesignPrinciples.tsx
│   │   │   └── index.ts
│   │   └── layout/
│   │       ├── PEC3Layout.tsx
│   │       └── index.ts
│   ├── features/                # Features específicas de PEC 3
│   │   ├── visualization-analysis/
│   │   ├── design-critique/
│   │   └── improvement-proposal/
│   ├── data/                    # Datos específicos de PEC 3
│   ├── assets/                  # Assets específicos de PEC 3
│   ├── utils/                   # Utilidades específicas de PEC 3
│   └── types/                   # Tipos específicos de PEC 3
├──
├── pec4/                        # 📊 PEC 4 - Análisis de CO₂
│   ├── page.tsx                 # Página principal
│   ├── components/              # Componentes específicos de PEC 4
│   │   ├── dashboard/
│   │   │   ├── StatisticsPanel.tsx
│   │   │   ├── ViewToggle.tsx
│   │   │   └── index.ts
│   │   ├── layout/
│   │   │   ├── PEC4Layout.tsx
│   │   │   ├── BackButton.tsx
│   │   │   └── index.ts
│   │   └── pages/               # Componentes por página
│   │       ├── continent/
│   │       │   ├── ContinentPage.tsx
│   │       │   ├── ContinentClient.tsx
│   │       │   └── index.ts
│   │       └── index.ts
│   ├── features/                # Features de análisis de CO₂
│   │   ├── geographic/          # Análisis geográfico
│   │   │   ├── components/
│   │   │   │   ├── MapChart.tsx
│   │   │   │   └── Legend.tsx
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   ├── temporal/            # Análisis temporal
│   │   │   ├── components/
│   │   │   │   └── LineChart.tsx
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── rankings/            # Rankings y comparaciones
│   │   │   ├── components/
│   │   │   │   └── RankingTable.tsx
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   ├── filters/             # Sistema de filtros
│   │   │   ├── components/
│   │   │   │   └── FiltersPanel.tsx
│   │   │   ├── hooks/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   └── emissions/           # Feature principal de emisiones
│   │       ├── context/
│   │       │   └── DataContext.tsx
│   │       ├── hooks/
│   │       ├── utils/
│   │       ├── types/
│   │       └── index.ts
│   ├── data/                    # Datos específicos de CO₂
│   │   ├── dataUtils.ts
│   │   ├── smallCountries.ts
│   │   └── index.ts
│   ├── theme/                   # Tema específico de CO₂
│   │   ├── colorUtils.ts
│   │   ├── page.tsx
│   │   └── index.ts
│   ├── routes/                  # Rutas específicas de PEC 4
│   │   └── continents/
│   │       └── [continent]/
│   │           ├── page.tsx
│   │           └── client.tsx
│   ├── assets/                  # Assets específicos de PEC 4
│   ├── documentation/           # Documentación de PEC 4
│   │   └── page.tsx
│   ├── utils/                   # Utilidades específicas de PEC 4
│   └── types/                   # Tipos específicos de PEC 4
│       ├── emissions.ts
│       ├── geography.ts
│       └── index.ts
├──
├── practica/                    # 🎯 Práctica - Visualización interactiva
│   ├── page.tsx                 # Página principal
│   ├── components/              # Componentes específicos de Práctica
│   │   ├── visualization/
│   │   ├── interaction/
│   │   └── layout/
│   ├── features/                # Features específicas de Práctica
│   │   ├── user-research/
│   │   ├── interactive-design/
│   │   └── evaluation/
│   ├── data/                    # Datos específicos de Práctica
│   ├── assets/                  # Assets específicos de Práctica
│   ├── utils/                   # Utilidades específicas de Práctica
│   └── types/                   # Tipos específicos de Práctica
└──
└── legacy/                      # 📦 ARCHIVOS LEGACY (temporal)
    ├── old-features/            # Features antes de reorganizar
    └── migration-notes.md       # Notas de migración
```

## 🎯 Beneficios de la Nueva Arquitectura

### 1. **Separación Clara por PEC**

- Cada PEC es completamente independiente
- Fácil identificar qué pertenece a cada entrega
- No hay contaminación entre proyectos

### 2. **Escalabilidad**

- Agregar PEC 5, 6, etc. es trivial
- Cada PEC sigue la misma estructura predecible
- Fácil mantenimiento a largo plazo

### 3. **Componentes Organizados**

- `components/` por página y funcionalidad
- `features/` con Screaming Architecture dentro de cada PEC
- Estructura consistente y predecible

### 4. **Recursos Compartidos Claros**

- Solo en `shared/` lo verdaderamente reutilizable
- UI components, hooks, utils globales
- Evita duplicación innecesaria

### 5. **Desarrollo en Paralelo**

- Equipos pueden trabajar en PECs diferentes sin conflictos
- Estructura de carpetas clara y predecible
- Fácil onboarding de nuevos desarrolladores

## 🚀 Plan de Migración

### Fase 1: Crear nueva estructura

1. Crear carpetas `shared/`, reorganizar PECs
2. Mover recursos específicos a cada PEC

### Fase 2: Reorganizar PEC 4

1. Mover `features/` actuales a `pec4/features/`
2. Mover `data/`, `theme/`, `continents/` a `pec4/`
3. Crear `pec4/components/` específicos

### Fase 3: Actualizar imports

1. Actualizar todas las importaciones
2. Crear archivos `index.ts` para exports limpios
3. Verificar funcionamiento

### Fase 4: Preparar para futuras PECs

1. Extraer componentes verdaderamente compartidos a `shared/`
2. Documentar patterns y convenciones
3. Crear templates para nuevas PECs

## 📋 Convenciones

### Estructura de Cada PEC

```
pecX/
├── page.tsx              # Página principal obligatoria
├── components/           # Componentes específicos obligatorio
├── features/            # Features con Screaming Architecture (opcional)
├── data/                # Datos específicos (opcional)
├── assets/              # Assets específicos (opcional)
├── utils/               # Utilidades específicas (opcional)
├── types/               # Tipos específicos (opcional)
└── README.md            # Documentación obligatoria
```

### Imports Recomendados

```typescript
// Recursos compartidos
import { Button, Card } from "@/app/shared/components/ui";
import { useLocalStorage } from "@/app/shared/hooks";

// Recursos específicos de PEC
import { MapChart } from "@/app/pec4/features/geographic";
import { EmissionData } from "@/app/pec4/types";
```

## 🔮 Extensiones Futuras

- **PEC 5, 6, 7...**: Siguiendo la misma estructura
- **Shared Libraries**: Extraer a paquetes npm si crece
- **Micro-frontends**: Cada PEC como aplicación independiente
- **Testing**: Estructura de tests paralela a la de código
