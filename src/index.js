import fs from 'fs';
import path from 'path';
import { inspect } from 'util';

const [, , source, output] = process.argv;
if (!source || !output) {
  throw new TypeError(
    'Parameter was omitted. node unpack/index.js :source :output'
  );
}

const sourcePath = path.resolve(source);
const outputPath = path.resolve(output);

console.info(`👜 Feeles/unpack:\t${sourcePath} into\t${outputPath}`);

mkdirIfNotExist(outputPath);

const content = fs.readFileSync(sourcePath, 'utf8');
const array = JSON.parse(content);
for (const { name, composed } of array) {
  const filePath = path.join(outputPath, name);
  const loc = path.parse(filePath);
  mkdirIfNotExist(loc.dir);
  fs.writeFileSync(filePath, composed, 'base64');
}

function mkdirIfNotExist(absolutePath) {
  if (!fs.existsSync(absolutePath)) {
    const dir = path.parse(absolutePath).dir;
    mkdirIfNotExist(dir);
    fs.mkdirSync(absolutePath);
  }
}
