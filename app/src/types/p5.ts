import p5, { Renderer } from "p5";

export type P5Instance<T> = p5 & { variables?: T & P5Defaults };

export type P5InstanceInitialized<T> = p5 & { variables: T & P5Defaults };

export type P5Defaults = { refresh: (p: P5Instance<any>) => void };

export type SketchInstance = (p: P5Instance<null>) => void;

// Type guard to see if variables is defined
export const isP5InstanceInitialized = <T>(
  p: P5Instance<T>
): p is P5InstanceInitialized<T> => p.variables !== undefined;
