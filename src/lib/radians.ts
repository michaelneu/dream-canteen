import { Opaque } from "../types/OpaqueType";

export type Radians = Opaque<number, "Radians">;
export type Degrees = Opaque<number, "Degrees">;

export function radiansToDegrees(value: Radians): Degrees {
  return ((value * 180) / Math.PI) as Degrees;
}

export function degreesToRadians(value: Degrees): Radians {
  return ((value / 180) * Math.PI) as Radians;
}
