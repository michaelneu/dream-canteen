export function areSetsEqual<T>(a: ReadonlySet<T>, b: ReadonlySet<T>): boolean {
  if (a.size !== b.size) {
    return false;
  }

  for (const item of Array.from(a)) {
    if (!b.has(item)) {
      return false;
    }
  }

  return true;
}
