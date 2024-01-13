import { ReadOnly2DArray } from "../types/ReadOnly2DArray";

export function matrixHasConsistentNumberOfCells<T>(
  matrix: ReadOnly2DArray<T>,
): boolean {
  const lengths = new Set(matrix.map((row) => row.length));
  return lengths.size === 1;
}
