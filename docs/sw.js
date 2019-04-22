const CACHENAME = `static-v${'1555933408.047'}`;
const ASSETS = [
  // your list of cache keys to store in cache
  'bundle.js',
  'index.html',
  'manifest.json',
  'favicon.png',
  // etc.
];
const DEBUG = true;

const offlineResponse = new Response(
  '<div><h2>Uh oh that did not work</h2></div>',
  {
    headers: {
      'Content-type': 'text/html',
    },
  },
);

const includesHTML = (url) =>
  url
    .toString()
    .toLowerCase()
    .includes('.html');

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache.addAll(ASSETS).then(() => {
        return self.skipWaiting();
      });
    }),
  );
});

self.onactivate = (evt) => {
  console.log(`on activate - ${CACHENAME}`);

  evt.waitUntil(
    caches.keys().then((cacheNames) => {
      const deleteOldCaches = cacheNames.map((cacheName) => {
        console.log(cacheName);

        if (cacheName != CACHENAME) {
          return caches.delete(cacheName);
        }

        return Promise.resolve();
      });

      return Promise.all(deleteOldCaches);
    }),
  );

  self.clients.claim();
};

self.onfetch = (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((response) => {
      console.log('Responding with CACHE to:', evt.request.url);
      if (response) return response;

      if (!navigator.onLine && includesHTML(evt.request.url)) {
        if (DEBUG)
          console.log('Responding with OFFLINE MESSAGE to:', evt.request.url);
        return offlineResponse;
      }

      if (DEBUG) console.log('Responding with FETCH to:', evt.request.url);
      return fetch(evt.request);
    }),
  );

  console.log(`on fetch - ${CACHENAME}`);
};
