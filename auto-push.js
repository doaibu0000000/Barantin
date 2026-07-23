import { exec } from 'child_process';
import chokidar from 'chokidar';

const debounceTime = 2000; // 2 seconds debounce
let timeout = null;

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.warn(`Error executing ${command}:`, stderr);
        return resolve(false); // don't reject to keep the process alive
      }
      resolve(true);
    });
  });
};

const pushChanges = async () => {
  console.log('🔄 Changes detected. Pushing to GitHub...');
  
  const added = await runCommand('git add .');
  if (!added) return;

  const timestamp = new Date().toLocaleString();
  const committed = await runCommand(`git commit -m "Auto update: ${timestamp}"`);
  
  // If nothing to commit, commit fails but we don't necessarily want to push
  
  const pushed = await runCommand('git push');
  if (pushed) {
    console.log(`✅ Successfully pushed changes to GitHub at ${timestamp}`);
  } else {
    console.log(`❌ Failed to push changes.`);
  }
};

const watcher = chokidar.watch('.', {
  ignored: [/(^|[\/\\])\../, '**/node_modules/**', '**/dist/**'],
  persistent: true
});

console.log('👀 Watching for file changes to auto-push...');

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  
  if (timeout) clearTimeout(timeout);
  timeout = setTimeout(pushChanges, debounceTime);
});
