import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { open } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createGzip } from 'node:zlib';

const compress = async () => {
    const srcFile = join(dirname(fileURLToPath(import.meta.url)), 'files', 'fileToCompress.txt')
    const destFile = join(dirname(srcFile), 'archive.gz')

    try {
        const inputFd = await open(srcFile, 'r');
        const outputFd = await open(destFile, 'wx');

        return pipeline(
            inputFd.createReadStream({encoding: 'utf8'}),
            createGzip(),
            outputFd.createWriteStream()
        );
    } catch (e) {
        console.error(e)
    }
};

await compress();