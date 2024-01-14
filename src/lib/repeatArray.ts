export function repeatArray<T>(array: readonly T[], times: number): T[] {
  return new Array(times).fill(array).flat();
}
