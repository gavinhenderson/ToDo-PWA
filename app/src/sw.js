const CACHENAME = `v-${TIME}`;

self.oninstall = (evt) => {
  console.log(`on install - ${TIME}`);

  evt.waitUntil(
    caches.open(CACHENAME).then((cache) => {
      return cache.addAll(['index.html', 'bundle.js']);
    }),
  );

  self.skipWaiting();
};

self.onactivate = (evt) => {
  console.log(`on activate - ${TIME}`);

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
  if (event.request.url.startsWith(self.location.origin)) {
    evt.waitUntil(
      caches.match(evt.request).then((response) => {
        if (response) return response;

        return fetch(evt.request);
      }),
    );
  }

  console.log(`on fetch - ${TIME}`);
};
