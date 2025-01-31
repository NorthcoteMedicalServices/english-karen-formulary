const CACHE_NAME = `karen-formulary-v1`;  // Keep a version if necessary

// Use the install event to pre-cache all initial resources
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([
      '../',
      '../assets/'
    ]);
    self.skipWaiting(); // Immediately activate the new service worker
  })());
});

// On SW activate, remove old caches and take control
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const cacheKeys = await caches.keys();
    await Promise.all(
      cacheKeys.map(key => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      })
    );
    self.clients.claim(); // Take control of any open pages
  })());
});

// Always try the network first, fallback to cache if offline
self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    try {
      const fetchResponse = await fetch(event.request);
      
      // Update cache with latest response
      const cache = await caches.open(CACHE_NAME);
      cache.put(event.request, fetchResponse.clone());
      
      return fetchResponse;
    } catch (e) {
      // If network fails, return cached version
      return caches.match(event.request);
    }
  })());
});
