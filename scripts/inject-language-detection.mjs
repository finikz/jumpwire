import { access, readFile, readdir, writeFile } from 'node:fs/promises'
import { extname, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const publicRoot = resolve(root, 'public')
const sourcePages = ['index.html', 'menu/index.html', 'events/index.html', 'en/index.html', 'en/menu/index.html', 'en/events/index.html'].map((file) => resolve(root, file))
const exists = async (path) => access(path).then(() => true, () => false)
const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true })
  const nested = await Promise.all(entries.map((entry) => {
    const path = resolve(directory, entry.name)
    return entry.isDirectory() ? walk(path) : [path]
  }))
  return nested.flat()
}
const routeFor = (file, base) => {
  const path = relative(base, file).replaceAll('\\', '/')
  return `/${path.replace(/index\.html$/, '').replace(/\/$/, '')}/`.replace(/^\/\/$/, '/')
}
const normalize = (path) => path.replace(/\/+$/, '') || '/'
const englishPages = [
  ...(await walk(resolve(publicRoot, 'en'))).filter((file) => extname(file) === '.html'),
  ...(await walk(resolve(root, 'en'))).filter((file) => extname(file) === '.html'),
]
const englishRoutes = new Set(englishPages.map((file) => routeFor(file, file.startsWith(publicRoot) ? publicRoot : root)))
const routes = {}

for (const englishRoute of englishRoutes) {
  const chineseRoute = englishRoute.replace(/^\/en(?=\/|$)/, '') || '/'
  const relativePage = chineseRoute === '/' ? 'index.html' : `${chineseRoute.replace(/^\//, '').replace(/\/$/, '')}/index.html`
  if (await exists(resolve(root, relativePage)) || await exists(resolve(publicRoot, relativePage))) {
    routes[normalize(chineseRoute)] = englishRoute
    if (chineseRoute !== '/') routes[normalize(`${chineseRoute}index.html`)] = englishRoute
  }
}

for (const [legacyRoute, englishRoute] of [['/event/', '/en/events/'], ['/faq/', '/en/about/#faq'], ['/visit/', '/en/about/#visit']]) {
  routes[normalize(legacyRoute)] = englishRoute
  routes[normalize(`${legacyRoute}index.html`)] = englishRoute
}

for (const file of await walk(resolve(publicRoot, 'notes/standalone'))) {
  if (extname(file) !== '.html') continue
  const slug = file.split('/').at(-1).replace(/\.html$/, '')
  const englishRoute = `/en/notes/${slug}/`
  if (englishRoutes.has(englishRoute)) routes[`/notes/standalone/${slug}.html`] = englishRoute
}

const script = `(() => {
  const routes = ${JSON.stringify(routes)};
  const preferenceKey = 'jumpwire-language';
  const remember = (language) => { try { localStorage.setItem(preferenceKey, language); } catch {} };
  document.addEventListener('click', (event) => {
    const anchor = event.target.closest?.('a') || event.target.parentElement?.closest('a');
    const label = (anchor?.textContent || anchor?.getAttribute('aria-label') || '').replace(/\\s+/g, ' ').trim().toLowerCase();
    if (/^(en|english)$/.test(label)) remember('en');
    if (/^(中文|简体中文|chinese)$/.test(label)) remember('zh');
  });

  let path = location.pathname;
  try { path = decodeURIComponent(path); } catch {}
  path = path.replace(/\\/+$/, '') || '/';
  if (path === '/en' || path.startsWith('/en/')) return;

  let language;
  try { language = localStorage.getItem(preferenceKey); } catch {}
  if (language !== 'zh' && language !== 'en') {
    const locale = (navigator.languages && navigator.languages[0]) || navigator.language || '';
    language = /^zh(?:[-_]|$)/i.test(locale) ? 'zh' : 'en';
  }
  if (language !== 'en') return;

  const cleanPath = path.replace(/\\/index\\.html$/, '');
  const noteCopy = cleanPath.match(/^\\/notes\\/(.+?)\\s+\\d+$/);
  const destination = routes[path] || routes[cleanPath] || (noteCopy && routes['/notes/' + noteCopy[1]]);
  if (!destination) return;
  const [targetPath, targetHash] = destination.split('#', 2);
  location.replace(targetPath + location.search + (targetHash ? '#' + targetHash : location.hash));
})();`

await writeFile(resolve(publicRoot, 'language-detection.js'), `${script}\n`)
const publicPages = (await walk(publicRoot)).filter((file) => extname(file) === '.html')
for (const file of new Set([...publicPages, ...sourcePages])) {
  let html = await readFile(file, 'utf8')
  if (html.includes('src="/language-detection.js"')) continue
  if (!/<\/head>/i.test(html)) throw new Error(`Missing </head> in ${relative(root, file)}`)
  html = html.replace(/<\/head>/i, '  <script src="/language-detection.js"></script>\n</head>')
  await writeFile(file, html)
}

console.log(`Added language detection to ${publicPages.length + sourcePages.length} page files (${englishRoutes.size} English routes mapped).`)
