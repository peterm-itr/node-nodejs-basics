import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fork } from 'node:child_process';

const spawnChildProcess = async (args) => {
    const scriptFilePath = join(dirname(fileURLToPath(import.meta.url)), 'files', 'script.js');
    const child = fork(scriptFilePath, args, {stdio: ['inherit', 'inherit', 'inherit', 'ipc']});

    child.on('error', (err) => console.error('Fork failed', err));

    return child;
};

// Put your arguments in function call to test this functionality
spawnChildProcess(process.argv.slice(2));
