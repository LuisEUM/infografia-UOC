declare module "react-simple-maps" {
  import React from "react";

  interface ComposableMapProps {
    projection?: string;
    projectionConfig?: Record<string, unknown>;
    width?: number;
    height?: number;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  interface Geography {
    id?: string | number;
    type: string;
    properties: Record<string, unknown>;
    geometry: {
      type: string;
      coordinates: number[][] | number[][][] | number[][][][];
    };
    rsmKey?: string;
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: { geographies: Geography[] }) => React.ReactNode;
    [key: string]: unknown;
  }

  interface GeographyProps {
    geography: Geography;
    style?: {
      default?: React.CSSProperties;
      hover?: React.CSSProperties;
      pressed?: React.CSSProperties;
    };
    [key: string]: unknown;
  }

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    translateExtent?: [[number, number], [number, number]];
    onMoveStart?: (position: {
      coordinates: [number, number];
      zoom: number;
    }) => void;
    onMove?: (position: {
      coordinates: [number, number];
      zoom: number;
    }) => void;
    onMoveEnd?: (position: {
      coordinates: [number, number];
      zoom: number;
    }) => void;
    [key: string]: unknown;
  }

  interface MarkerProps {
    coordinates: [number, number];
    [key: string]: unknown;
  }

  interface LineProps {
    from: [number, number];
    to: [number, number];
    stroke?: string;
    strokeWidth?: number;
    [key: string]: unknown;
  }

  interface CommonProps {
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
  }

  export const ComposableMap: React.FC<ComposableMapProps>;
  export const Geographies: React.FC<GeographiesProps>;
  export const Geography: React.FC<GeographyProps>;
  export const ZoomableGroup: React.FC<ZoomableGroupProps>;
  export const Marker: React.FC<MarkerProps>;
  export const Line: React.FC<LineProps>;
  export const Graticule: React.FC<CommonProps>;
  export const Sphere: React.FC<CommonProps>;
  export const Annotation: React.FC<CommonProps>;
}
