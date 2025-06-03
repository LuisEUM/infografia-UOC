# 🔍 Filters Feature

**Propósito**: Sistema de filtrado y selección de datos para el análisis de emisiones

## 📊 Responsabilidades

Esta feature maneja toda la funcionalidad relacionada con:

- **Filtros de variables de emisión**
- **Selección de rangos temporales**
- **Filtrado geográfico por continentes**
- **Configuración de límites de visualización**

## 🧩 Componentes

### `FiltersPanel.tsx`

- **Propósito**: Panel principal de filtros y configuración
- **Características**:
  - Selector de variables de emisión
  - Control de rango de años (slider dual)
  - Dropdown de continentes
  - Configurador de límites de ranking
  - Estado responsive
  - Validación de inputs
  - Persistencia de preferencias

## 🔄 Interacciones con otras Features

- **Geographic**: Afecta visualización del mapa y leyenda
- **Temporal**: Determina rango de años para análisis
- **Rankings**: Configura filtros y límites de tabla
- **Shared**: Actualiza estado global de filtros

## ⚙️ Tipos de Filtros

### Variables de Emisión

- **CO₂ Total**: Emisiones absolutas en millones de toneladas
- **CO₂ Per Cápita**: Emisiones por habitante
- **Participación Global**: Porcentaje del total mundial

### Filtros Temporales

- **Año Individual**: Para análisis puntual
- **Rango de Años**: Para promedios y tendencias
- **Slider Dual**: Selección intuitiva de rangos

### Filtros Geográficos

- **Todos los Continentes**: Vista global
- **Continente Específico**: Focus regional
- **Múltiples Continentes**: Comparaciones

### Configuraciones de Visualización

- **Límite de Ranking**: 10, 25, 50, 100 países
- **Modo de Color**: Continuo vs categórico
- **Precisión de Datos**: Decimales mostrados

## 🎛️ Controles Disponibles

### Selectores

- Dropdown de variables
- Dropdown de continentes
- Selector de límites numéricos

### Rangos

- Slider de años (rango)
- Input numérico directo
- Botones de incremento/decremento

### Toggle

- Modo de color del mapa
- Mostrar/ocultar estadísticas
- Activar/desactivar animaciones

## 📊 Estados y Validaciones

### Validaciones

- Rangos de años válidos
- Variables disponibles
- Límites dentro de rangos permitidos

### Estados

- **Cargando**: Durante fetch de datos
- **Error**: En validaciones fallidas
- **Activo**: Filtros aplicados correctamente
- **Disabled**: Cuando no hay datos
