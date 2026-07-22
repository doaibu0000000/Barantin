import { exec } from 'child_process';
import chokidar from 'chokidar';

const watcher = chokidar.watch('.', {
  ignored: [/(^|[\/\\])\../, 'node_modules', 'dist', 'auto-push.js'], 
  persistent: true,
  ignoreInitial: true
});

let timer;
const pushToGit = () => {
  console.log('Perubahan terdeteksi! Melakukan commit dan push ke GitHub...');
  
  // Execute add, commit, and push
  exec('git add . && git commit -m "Auto update dari local" && git push', (error, stdout, stderr) => {
    if (error) {
      if (stdout.includes('nothing to commit') || stderr.includes('nothing to commit')) {
        console.log('Tidak ada perubahan untuk di-commit.');
      } else {
        console.error(`Error: ${error.message}`);
      }
      return;
    }
    console.log(`Berhasil push ke GitHub:\n${stdout}`);
  });
};

watcher.on('all', (event, path) => {
  // Tunggu 3 detik setelah perubahan terakhir sebelum push (debounce)
  // agar tidak terjadi spam commit saat Anda mengetik cepat atau save berkali-kali
  clearTimeout(timer);
  timer = setTimeout(pushToGit, 3000); 
});

console.log('Sedang memantau file... Setiap perubahan yang disimpan (save) akan otomatis di-push ke GitHub setelah 3 detik.');
