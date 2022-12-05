import { stdin, stdout } from 'node:process';
import { pipeline } from 'node:stream/promises';

const transform = async () => {
    return pipeline(
        stdin,
        async function * (source) {
            source.setEncoding('utf8');

            for await (const chunk of source) {
                yield chunk.split('').reverse().join('');
            }
        },
        stdout
    );
};

await transform();