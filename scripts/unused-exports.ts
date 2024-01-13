import fs from "fs";

function listAllFiles(path: string): readonly string[] {
  if (!fs.lstatSync(path).isDirectory()) {
    return [path];
  }

  const items = fs.readdirSync(path);
  return items.flatMap((item) => listAllFiles(`${path}/${item}`));
}

function findExports(text: string): readonly string[] {
  return Array.from(
    text.matchAll(
      /export (enum|const|abstract class|class|type|interface|function) ([A-Za-z0-9\_]+)/g,
    ),
  ).map((match) => match[0].split(" ")[2]);
}

const paths = listAllFiles("./src");
const files = new Map(
  paths.map((path) => {
    const text = fs.readFileSync(path).toString();
    return [
      path,
      {
        text,
        exportedSymbols: findExports(text),
      },
    ];
  }),
);

const allUnused = new Map<string, string[]>();

for (const [path, { exportedSymbols }] of Array.from(files.entries())) {
  const unused = exportedSymbols.filter((exportedSymbol) => {
    for (const [otherPath, { text: otherText }] of Array.from(
      files.entries(),
    )) {
      if (otherPath === path) {
        continue;
      }

      if (otherText.includes(exportedSymbol)) {
        return false;
      }
    }

    return true;
  });

  if (unused.length > 0) {
    allUnused.set(path, unused);
  }
}

if (allUnused.size === 0) {
  console.log("No unused exports!");
  process.exit(0);
}

console.warn(`${allUnused.size} unused exports`);

for (const [path, unused] of Array.from(allUnused.entries())) {
  console.log(path, unused);
}

process.exit(1);
