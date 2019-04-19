const DEBUG = true;
const IGNORE = ['sockjs-node'];

const toIgnore = (url) => IGNORE.find((current) => url.includes(current));

self.addEventListener('install', (event) => {
  if (DEBUG) console.log(`New service worker installed at: ${TIME}`);
  self.skipWaiting();

  console.log('self', self);

  /* event.waitUntil(
    caches.open('static-v1').then((cache) => {
      cache.add(assetsToCache);
    }),
  ); */
});

self.addEventListener('activate', (event) => {
  if (DEBUG) console.log(`Service worker active: ${TIME}`);
});

self.addEventListener('fetch', (event) => {
  if (DEBUG) console.log(`Fetch hit on service worker: ${TIME}`);
  if (toIgnore(event.request.url)) return;
  if (DEBUG) console.log('FetchURL:', event.request.url);

  //const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  //if (url.origin == location.origin && url.pathname == '/dog.svg') {
  //event.respondWith(caches.match('/cat.svg'));
  //}
});
