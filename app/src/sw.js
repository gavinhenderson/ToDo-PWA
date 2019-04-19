const DEBUG = true;
const IGNORE = ['sockjs-node'];
const ASSETS = ['/bundle.js', '/index.html'];
const cacheName = `static-v${TIME}`;

const toIgnore = (url) => IGNORE.find((current) => url.includes(current));
const isAsset = (url) =>
  ASSETS.find((current) => url.toString().includes(current));

self.addEventListener('install', (event) => {
  if (DEBUG) console.log(`New service worker installed at: ${TIME}`);
});

self.addEventListener('activate', (event) => {
  if (DEBUG) console.log(`Service worker active: ${TIME}`);
  if (DEBUG && !navigator.onLine) console.log('OFFLINE MODE');

  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.add(ASSETS);
    }),
  );
});

self.addEventListener('fetch', (event) => {
  if (toIgnore(event.request.url)) return;

  if (DEBUG) console.log(`Fetch hit on service worker: ${TIME}`);
  if (DEBUG) console.log('FetchURL:', event.request.url);

  const url = new URL(event.request.url);

  if ((url.origin == location.origin && isAsset(url)) || url.pathname == '/') {
    const cacheMatch = url.pathname == '/' ? '/index.html' : url.pathname;
    console.log('Responding from cache', cacheMatch);

    // event.respondWith(caches.match(cacheMatch));
  }
});
