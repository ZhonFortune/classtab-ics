#!/usr/bin/env node
import { exec } from 'child_process';

exec('vite build', (buildError, buildStdout, buildStderr) => {
    if (buildError) {
        console.error(`Build Failed:`);
        console.error(`${buildError.message}`);
        return;
    }
    console.log(`Build Success:`)
    console.log(`${buildStdout}`);

    const previewProcess = exec('vite preview', (previewError, previewStdout, previewStderr) => {
        if (previewError) {
            console.error(`Preview Failed:`);
            console.error(`${previewError.message}`);
            return;
        }
        console.log(`Preview Success:`);
        console.log(`${previewStdout}`);
    });

    // 实时输出预览日志
    previewProcess.stdout.on('data', (data) => console.log(data));
    previewProcess.stderr.on('data', (data) => console.error(data));

    // 监听终止信号
    process.on('SIGINT', () => {
        console.log('\nClosing Preview Server...');
        previewProcess.kill();
        process.exit();
    });
});