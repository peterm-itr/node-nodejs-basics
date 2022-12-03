import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { open } from 'node:fs/promises';
import { stdout } from 'node:process';
const { createHash } = await import('node:crypto');

const calculateHash = async () => {
    const fileName = join(
        dirname(fileURLToPath(import.meta.url)),
        'files',
        'fileToCalculateHashFor.txt'
    );
    const hash = createHash('sha256');
    const fd = await open(fileName);
    const input = fd.createReadStream({encoding: 'utf8'});

    input.pipe(hash).setEncoding('hex').pipe(stdout);
};

await calculateHash();