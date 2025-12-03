const cacheName = 'arbeitszeit-cache-v1';
const filesToCache = [
  '.',
  'index.html',
  'manifest.json',
  // CSS/JS falls extern
];

// Installiere Service Worker und cache Dateien
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Alte Caches löschen
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    )
  );
});

// Netzwerk mit Cache-Fallback
self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
  );
});