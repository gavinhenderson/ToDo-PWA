const CACHENAME = `v-${'1555704337.041'}`;

self.oninstall = (evt) => {
  console.log(`on install - ${'1555704337.041'}`);

  evt.waitUntil(
    caches.open(CACHENAME).then((cache) => {
      return cache.addAll(['/', '/index.html', '/bundle.js']);
    }),
  );

  self.skipWaiting();
};

self.onactivate = (evt) => {
  console.log(`on activate - ${'1555704337.041'}`);

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

  console.log(`on fetch - ${'1555704337.041'}`);
};
