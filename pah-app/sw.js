const CACHE = 'pah2-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { self.clients.claim(); });
self.addEventListener('fetch', e => {
  if (e.request.url.includes('graph.microsoft.com') || e.request.url.includes('login.microsoftonline.com') || e.request.url.includes('lemonsqueezy.com') || e.request.url.includes('fonts.googleapis.com') || e.request.url.includes('alcdn.msauth.net')) return;
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
