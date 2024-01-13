export function range(start: number, end: number) {
  return new Array(end - start).fill(0).map((_, index) => index);
}
