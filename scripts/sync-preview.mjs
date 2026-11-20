import {copyFile, cp, lstat, symlink} from 'node:fs/promises';
// Keep an already-running legacy preview server compatible with the Next export.
await copyFile(new URL('../out/index.html', import.meta.url), new URL('../index.html', import.meta.url));
const link = new URL('../_next', import.meta.url);
try { await lstat(link); } catch (error) {
  if (error.code !== 'ENOENT') throw error;
  await symlink('out/_next', link, 'dir');
}

await cp(new URL('../public/assets/', import.meta.url), new URL('../assets/', import.meta.url), {recursive:true});
