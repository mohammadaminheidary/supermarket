import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile } from 'tailwindcss';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = await readFile(resolve(root, 'src/input.css'), 'utf8');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const candidates = [...html.matchAll(/class="([^"]+)"/g)].flatMap((match) => match[1].split(/\s+/));
const compiler = await compile(input, {
  base: root,
  loadStylesheet: async (id, base) => {
    const path = id.startsWith('.')
      ? resolve(base, id)
      : fileURLToPath(import.meta.resolve(id === 'tailwindcss' ? 'tailwindcss/index.css' : id));
    return { path, base: dirname(path), content: await readFile(path, 'utf8') };
  },
});
await writeFile(resolve(root, 'src/output.css'), compiler.build(candidates));
console.log('Built src/output.css with Tailwind CSS.');
