/* TirzaDose Service Worker — cache-first, offline-ready */
const CACHE = 'tirzadose-v4';
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './img-dieta.png',
  './img-aplicacoes.png',
  './img-progresso.png',
  './img-exercicio.png',
  './icon-cafe.png',
  './icon-almoco.png',
  './icon-jantar.png',
  './icon-lanche.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=DM+Serif+Display:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.0/chart.umd.min.js'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => {
      return c.addAll(['./index.html','./manifest.json','./icon-192.png','./icon-512.png',
        './img-dieta.png','./img-aplicacoes.png','./img-progresso.png','./img-exercicio.png',
        './icon-cafe.png','./icon-almoco.png','./icon-jantar.png','./icon-lanche.png'])
        .then(() => Promise.allSettled(ASSETS.slice(13).map(url => c.add(url))));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  // Only handle GET requests
  if (e.request.method !== 'GET') return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request)
        .then(res => {
          // Cache successful responses for future offline use
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(() => {
          // If offline and not cached, return the app shell
          if (e.request.destination === 'document') {
            return caches.match('./index.html');
          }
        });
    })
  );
});
