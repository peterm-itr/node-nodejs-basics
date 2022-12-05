import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createWriteStream } from 'node:fs';
import { stdin } from 'node:process';

const write = async () => {
    const fileName = join(
        dirname(fileURLToPath(import.meta.url)),
        'files',
        'fileToWrite.txt'
    );
    const stream = createWriteStream(fileName, {encoding: 'utf8'});

    stdin.pipe(stream);
};

await write();