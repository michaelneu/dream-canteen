export function isWithin(value: number, min: number, max: number): boolean {
  return min < value && value < max;
}
