const CACHENAME = `static-v${TIME}`;

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHENAME).then(function(cache) {
      return cache
        .addAll([
          // your list of cache keys to store in cache
          'bundle.js',
          'index.html',
          'manifest.json',
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
  evt.respondWith(
    fetch(evt.request).catch((err) => {
      caches.match(evt.request).then((response) => {
        console.log(evt.request.url, response);

        if (response) return response;

        return new Response('<div><h2>Uh oh that did not work</h2></div>', {
          headers: {
            'Content-type': 'text/html',
          },
        });
      });
    }),
  );

  console.log(`on fetch - ${CACHENAME}`);
};
