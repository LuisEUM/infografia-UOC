declare module "topojson-client" {
  // Define basic TopoJSON types
  interface Topology {
    type: string;
    objects: Record<string, TopoObject>;
    arcs: number[][][];
    transform?: {
      scale: [number, number];
      translate: [number, number];
    };
  }

  interface TopoObject {
    type: string;
    id?: string | number;
    properties?: Record<string, unknown>;
    geometries?: TopoObject[];
    arcs?: number[][] | number[][][] | number[][][][];
  }

  interface GeoJSONObject {
    type: string;
    properties?: Record<string, unknown>;
    geometry?: GeoJSONObject;
    features?: GeoJSONObject[];
    coordinates?: number[] | number[][] | number[][][] | number[][][][];
  }

  // Define function signatures with more specific types
  export function feature(
    topology: Topology,
    object: TopoObject | string
  ): GeoJSONObject;

  export function mesh(
    topology: Topology,
    object: TopoObject | string,
    filter?: (a: unknown, b: unknown) => boolean
  ): GeoJSONObject;

  export function neighbors(
    objects: Array<TopoObject> | Record<string, TopoObject>
  ): number[][];

  export function quantize(
    topology: Topology,
    transform: { scale: [number, number]; translate: [number, number] }
  ): Topology;
}
