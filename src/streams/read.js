import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { open } from 'node:fs/promises';
import { stdout } from 'node:process';

const read = async () => {
    const fileName = join(
        dirname(fileURLToPath(import.meta.url)),
        'files',
        'fileToRead.txt'
    );
    const fd = await open(fileName);
    const stream = fd.createReadStream({encoding: 'utf8'});

    stream.pipe(stdout);
};

await read();