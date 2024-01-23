import fs from "fs";

export function listAllFiles(path: string): readonly string[] {
  if (!fs.lstatSync(path).isDirectory()) {
    return [path];
  }

  const items = fs.readdirSync(path);
  return items.flatMap((item) => listAllFiles(`${path}/${item}`));
}
