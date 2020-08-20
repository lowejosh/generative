import p5 from "p5";

export type P5Instance<T> = p5 & { variables?: T & P5Defaults };

export type P5Defaults = { refresh: Function };

export type SketchInstance = (p: P5Instance<null>) => void;
