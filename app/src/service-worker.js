self.addEventListener('install', (event) => {
  console.log('V1 installing…');
  console.log('install event', event);

  console.log(serviceWorkerOption);

  // cache a cat SVG
  //event.waitUntil(
  //caches.open('static-v1').then((cache) => cache.add('/cat.svg')),
  //);
});

self.addEventListener('activate', (event) => {
  console.log('V1 now ready to handle fetches!');
  console.log('active event', event);
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch hit on service worker');
  console.log('fetch event', event);
  //const url = new URL(event.request.url);

  // serve the cat SVG from the cache if the request is
  // same-origin and the path is '/dog.svg'
  //if (url.origin == location.origin && url.pathname == '/dog.svg') {
  //event.respondWith(caches.match('/cat.svg'));
  //}
});
