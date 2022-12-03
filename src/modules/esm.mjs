import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readFile } from 'node:fs/promises';
import { release, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';
import './files/c.js'

const random = Math.random();
const currentFile = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFile);

let unknownFilename = 'b.json';

if (random > 0.5) {
    unknownFilename = 'a.json';
}
let unknownObject = await readFile(
        path.join(currentDirectory, 'files', unknownFilename),
        {encoding: "utf-8"}
    ).then(JSON.parse);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${currentFile}`);
console.log(`Path to current directory is ${path.dirname(currentFile)}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
