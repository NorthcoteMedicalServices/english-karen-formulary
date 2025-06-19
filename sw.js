const CACHE_NAME = `formulary_cache_v1`;

// Use the install event to pre-cache all initial resources from file_list.json.
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    try {
      const cache = await caches.open(CACHE_NAME);
      
      // Fetch the JSON file that lists all the files to cache.
      const response = await fetch('file_list.json');
      if (!response.ok) {
        throw new Error(`Failed to fetch file_list.json: ${response.statusText}`);
      }
      
      // Parse the JSON to get the file list.
      const fileList = await response.json();
      
      // Cache all the files in the file list. (cache separately so one bad file doesn't break it)
      await Promise.all(fileList.map(file => {
        try {
          cache.add(file)
        }
        catch (e) {console.error(`lol failed: ${file}`)}
      }))
      
      // Optionally, force the waiting service worker to become active immediately.
      self.skipWaiting();
    } catch (error) {
      console.error('Error during service worker installation:', error);
    }
  })());
});

self.addEventListener('fetch', event => {
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    
    // Try matching the request exactly.
    let cachedResponse = await cache.match(event.request);
    
    // If not found, try matching while ignoring the query parameters.
    if (!cachedResponse) {
      cachedResponse = await cache.match(event.request, { ignoreSearch: true });
    }
    
    if (cachedResponse) {
      return cachedResponse;
    } else {
      try {
        // If the resource isn’t in the cache, try fetching it from the network.
        const fetchResponse = await fetch(event.request);
        // Cache the fetched response for future use.
        cache.put(event.request, fetchResponse.clone());
        return fetchResponse;
      } catch (e) {
        // Optionally, return a fallback response here.
        console.error('Fetch failed; returning offline page instead.', e);
        throw e;
      }
    }
  })());
});
