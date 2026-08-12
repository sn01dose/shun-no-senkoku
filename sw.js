/* しゅんの宣告 — minimal service worker（常に最新を取りに行き、オフライン時のみキャッシュ） */
const CACHE = 'shun-v1';

self.addEventListener('install', () => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', (e) => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./', copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match('./'))
  );
});
