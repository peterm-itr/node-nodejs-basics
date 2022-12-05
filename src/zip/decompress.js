import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { open } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createGunzip } from 'node:zlib';

const decompress = async () => {
    const srcFile = join(dirname(fileURLToPath(import.meta.url)), 'files', 'archive.gz')
    const destFile = join(dirname(srcFile), 'fileToCompress.txt')

    try {
        const inputFd = await open(srcFile, 'r');
        const outputFd = await open(destFile, 'wx');

        return pipeline(
            inputFd.createReadStream(),
            createGunzip(),
            outputFd.createWriteStream()
        );
    } catch (e) {
        console.error(e)
    }
};

await decompress();