const { assets } = global.serviceWorkerOption;
const assetsToCache = [...assets, './'];

self.addEventListener('install', (event) => {
  console.log('V1 installing…');
  console.log('CACHE THESE ASSETS', assetsToCache);
  console.log('install event', event);
  self.skipWaiting();

  event.waitUntil(
    caches.open('static-v1').then((cache) => {
      cache.add(assetsToCache);
    }),
  );
});

self.addEventListener('activate', (event) => {
  console.log('V1 now ready to handle fetches!');
  console.log('active event', event);
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch hit on service worker');
  console.log('fetch event', event.request.url);
  //const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  //if (url.origin == location.origin && url.pathname == '/dog.svg') {
  //event.respondWith(caches.match('/cat.svg'));
  //}
});
