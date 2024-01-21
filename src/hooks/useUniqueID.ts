import { useState } from "react";
import { Opaque } from "../types/OpaqueType";

type UniqueID = Opaque<number, "UniqueID">;

let nextID = 0;

export function useUniqueID(): UniqueID {
  const [value] = useState(() => {
    const id = nextID;
    nextID++;
    return id;
  });

  return value as UniqueID;
}
