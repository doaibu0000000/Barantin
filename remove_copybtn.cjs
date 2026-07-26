const fs = require('fs');
const file = 'src/components/CookieTool.ts';
let content = fs.readFileSync(file, 'utf8');

// Remove HTML block
content = content.replace(/      <div class="absolute bottom-4 right-4 flex gap-2">[\s\S]*?<\/div>/g, '');

// Remove DOM references
content = content.replace(/  const copyBtn = document.getElementById\('copyBtn'\) as HTMLButtonElement;\n/g, '');
content = content.replace(/  const copyText = document.getElementById\('copyText'\) as HTMLSpanElement;\n/g, '');

// Remove initial visibility logic
content = content.replace(/  if \(copyBtn\) \{\n    if \(savedOutput\) copyBtn\.classList\.remove\('hidden'\);\n    else copyBtn\.classList\.add\('hidden'\);\n  \}\n/g, '');

// Remove event listener block
const eventListenerRegex = /  if \(copyBtn\) \{\n    copyBtn\.addEventListener\('click', async \(\) => \{\n[\s\S]*?    \}\);\n  \}\n/g;
content = content.replace(eventListenerRegex, '');

// Remove inline visibility toggles
content = content.replace(/          if \(copyBtn\) copyBtn\.classList\.add\('hidden'\);\n/g, '');
content = content.replace(/                  if \(copyBtn\) copyBtn\.classList\.remove\('hidden'\);\n/g, '');
content = content.replace(/                  if \(copyBtn\) copyBtn\.classList\.add\('hidden'\);\n/g, '');

fs.writeFileSync(file, content, 'utf8');
console.log('copyBtn references removed successfully.');
