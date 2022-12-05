import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cpus } from 'node:os';
import { Worker } from 'node:worker_threads';

const performCalculations = async () => {
    const workerFilePath = join(dirname(fileURLToPath(import.meta.url)), 'worker.js');
    const workersCount = cpus().length;
    const promises = [];

    for (let i = 10; i < 10 + workersCount; ++i) {
        promises.push(new Promise((resolve, reject) => {
            const worker = new Worker(workerFilePath, {workerData: i});

            worker.on('message', resolve);
            worker.on('error', reject);

            worker.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error('exit code is ${code}'));
                }
            });
        }));
    }

    return Promise.allSettled(promises)
        .then((results) => {
            console.table(results.map((result) => {
                if (result.status === 'fulfilled') {
                    return {'status': 'resolved', 'data': result.value};
                }

                return {'status': 'error', 'data': null};
            }));
        });
};

await performCalculations();