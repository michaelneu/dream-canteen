import { randomArrayIndex } from "./randomArrayIndex";

export function shuffleArray<T>(array: readonly T[]): T[] {
  if (array.length === 0) {
    return [];
  }

  const seenIndexes = new Set();
  const shuffled: T[] = [];

  while (seenIndexes.size !== array.length) {
    const index = randomArrayIndex(array);
    if (seenIndexes.has(index)) {
      continue;
    }

    shuffled.push(array[index]);
    seenIndexes.add(index);
  }

  return shuffled;
}
