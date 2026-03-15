import fs from 'node:fs';
import path from 'node:path';

const sourceDir = '/mnt/data';
const targetDir = path.resolve('public/assets');
const canonicalNames = ['nala', 'snoopy', 'milly', 'ferrapatte', 'aerotron', 'toximuse', 'choriflare', 'bousillaflor', 'tentaflux', 'crysalune', 'noctamuse'];

const normalize = (value) => value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-z0-9]/g, '');

fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(sourceDir)) {
  console.log('Source /mnt/data introuvable, placeholders utilisés.');
  process.exit(0);
}

let copied = 0;
for (const e of fs.readdirSync(sourceDir, { withFileTypes: true })) {
  if (!e.isFile() || path.extname(e.name).toLowerCase() !== '.png') continue;
  const src = path.join(sourceDir, e.name);
  const base = normalize(path.basename(e.name, '.png'));
  const canonical = canonicalNames.find((name) => base.includes(normalize(name)) || normalize(name).includes(base));

  if (canonical) fs.copyFileSync(src, path.join(targetDir, `${canonical}.png`));
  else fs.copyFileSync(src, path.join(targetDir, e.name.toLowerCase().replace(/\s+/g, '-')));
  copied += 1;
}

console.log(`Assets copiés: ${copied}`);
