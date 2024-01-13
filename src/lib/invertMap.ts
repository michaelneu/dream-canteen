export function invertMap<TKey, TValue>(
  map: ReadonlyMap<TKey, TValue>,
): Map<TValue, TKey> {
  const inverted = new Map();

  for (const [key, value] of Array.from(map.entries())) {
    inverted.set(value, key);
  }

  return inverted;
}
