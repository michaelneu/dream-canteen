import { Timestamp } from "../types/Numbers";

export function currentTime(): Timestamp {
  return Date.now() as Timestamp;
}
