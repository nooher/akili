// Akili service worker — network-first with offline fallback for the app shell.
// Versioned cache name: bump SW_VERSION on each release to evict stale shells.
const SW_VERSION = 'akili-v1';
const CACHE = `akili-shell-${SW_VERSION}`;

// Best-effort precache of the app shell. Built asset URLs are hashed and unknown
// here, so we precache the entry document and let runtime caching pick up the rest.
const PRECACHE_URLS = ['/', '/index.html', '/manifest.webmanifest', '/icon.svg'];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // addAll is all-or-nothing; add individually so one 404 can't fail install.
      Promise.allSettled(PRECACHE_URLS.map((url) => cache.add(url))),
    ),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Only handle same-origin GETs; let everything else hit the network untouched.
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Network-first: fresh when online, cached shell when offline.
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache a copy of successful basic responses for offline use.
        if (response && response.ok && response.type === 'basic') {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(async () => {
        const cached = await caches.match(request);
        if (cached) return cached;
        // For navigations, fall back to the cached app shell.
        if (request.mode === 'navigate') {
          const shell = await caches.match('/index.html');
          if (shell) return shell;
        }
        return new Response('Hauko mtandaoni (offline).', {
          status: 503,
          statusText: 'Offline',
          headers: { 'Content-Type': 'text/plain; charset=utf-8' },
        });
      }),
  );
});
