import fs from "fs";
import AdmZip from "adm-zip";
import { listAllFiles } from "./shared/listAllFiles";

const outputFolder = "./build";
const ignoredFiles = ["electron.js"];

const files = listAllFiles(outputFolder)
  .map((file) => file.substring(outputFolder.length + 1))
  .filter((file) => !ignoredFiles.includes(file));

const zip = new AdmZip();

for (const file of files) {
  console.log(`Adding ${file}`);
  const content = fs.readFileSync(`${outputFolder}/${file}`);
  zip.addFile(file, content);
}

zip.writeZip("dream-canteen.zip");
