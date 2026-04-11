const CACHE = 'pah-v3';
const ASSETS = ['./', './index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// Network first - always get fresh content
self.addEventListener('fetch', e => {
  if (e.request.url.includes('graph.microsoft.com') ||
      e.request.url.includes('login.microsoftonline.com') ||
      e.request.url.includes('lemonsqueezy.com') ||
      e.request.url.includes('fonts.googleapis.com')) return;
  // Always fetch fresh from network
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
