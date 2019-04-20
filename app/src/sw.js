const CACHENAME = `static-v1`;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache
        .addAll([
          // your list of cache keys to store in cache
          'bundle.js',
          'index.html',
          // etc.
        ])
        .then(() => {
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
  if (evt.request.url.startsWith(self.location.origin)) {
    evt.waitUntil(
      caches.match(evt.request).then((response) => {
        if (response) return response;

        return fetch(evt.request);
      }),
    );
  }

  console.log(`on fetch - ${CACHENAME}`);
};
