#!/usr/bin/env node
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 获取当前脚本所在的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 假设项目根目录是脚本所在目录的上一级目录，你可以根据实际情况修改
const projectRoot = join(__dirname, '..');

// 切换到项目根目录
process.chdir(projectRoot);

exec('vite build', (buildError, buildStdout, buildStderr) => {
    if (buildError) {
        console.error(`Build Failed:`);
        console.error(`${buildError.message}`);
        return;
    }
    console.log(`Build Success:`);
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